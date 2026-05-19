import { GbtpRequest, GbtpOperation } from './types';

export class GbtpRequestParser {
  /**
   * Converte uma string de requisição bruta (formato CHAVE: VALOR\n) em um objeto estruturado.
   * Aplica validações sintáticas iniciais.
   */
  static parse(rawString: string): GbtpRequest {
    const lines = rawString.split('\n');
    const fields: Record<string, string> = {};

    for (const line of lines) {
      if (!line.trim()) continue; // Ignora linhas vazias

      const index = line.indexOf(':');
      if (index === -1) {
        throw new Error('Erro de Sintaxe: Campo mal formatado. Esperado CHAVE: VALOR');
      }

      const key = line.substring(0, index).trim();
      const value = line.substring(index + 1).trim();
      fields[key] = value;
    }

    // 1. Validação de campos obrigatórios presentes na mensagem
    const requiredFields = ['OPERATION', 'ACCOUNT_ID', 'TO_ACCOUNT_ID', 'VALUE'];
    for (const field of requiredFields) {
      if (!(field in fields)) {
        throw new Error(`Validação: Campo obrigatório ausente: ${field}`);
      }
    }

    // 2. Validação da Operação
    const operation = fields['OPERATION'] as GbtpOperation;
    if (!['BALANCE', 'DEPOSIT', 'WITHDRAW', 'TRANSFER'].includes(operation)) {
      throw new Error(`Validação: Operação inválida: ${operation}`);
    }

    // 3. Validação do Valor numérico
    const value = parseFloat(fields['VALUE']);
    if (isNaN(value)) {
      throw new Error('Validação: O campo VALUE deve ser um número válido.');
    }
    if (value < 0) {
      throw new Error('Validação: O valor da transação não pode ser negativo.');
    }

    // 4. Validação de regras de negócio básicas (Origem != Destino)
    if (operation === 'TRANSFER' && fields['ACCOUNT_ID'] === fields['TO_ACCOUNT_ID']) {
      throw new Error('Validação: A conta de origem não pode ser igual à conta de destino.');
    }

    return {
      OPERATION: operation,
      ACCOUNT_ID: fields['ACCOUNT_ID'],
      TO_ACCOUNT_ID: fields['TO_ACCOUNT_ID'],
      VALUE: value
    };
  }
}