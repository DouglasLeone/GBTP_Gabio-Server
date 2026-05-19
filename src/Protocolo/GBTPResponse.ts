import {GbtpResponse} from './types';

export class GbtpProtocol {
  /**
   * Transforma um objeto de resposta em uma string padronizada no formato GBTP (CHAVE: VALOR\n)
   */
  static stringifyResponse(response: GbtpResponse): string {
    return [
      `STATUS:${response.STATUS}`,
      `MESSAGE:${response.MESSAGE}`,
      `BALANCE:${response.BALANCE.toFixed(2)}`
    ].join('\n') + '\n';
  }

  /**
   * Método auxiliar para gerar respostas de erro padronizadas rapidamente
   */
  static buildErrorResponse(message: string, currentBalance: number = 0): GbtpResponse {
    return {
      STATUS: 'ERROR',
      MESSAGE: message,
      BALANCE: currentBalance
    };
  }

  /**
   * Método auxiliar para gerar respostas de sucesso padronizadas rapidamente
   */
  static buildSuccessResponse(message: string, currentBalance: number): GbtpResponse {
    return {
      STATUS: 'OK',
      MESSAGE: message,
      BALANCE: currentBalance
    };
  }
}


 