// Tipos de operações permitidas pelo protocolo GBTP
export type GbtpOperation = 'BALANCE' | 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';

// Status possíveis na resposta do servidor
export type GbtpStatus = 'OK' | 'ERROR';

// Estrutura padrão de uma Requisição GBTP
export interface GbtpRequest {
  OPERATION: GbtpOperation;
  ACCOUNT_ID: string;
  TO_ACCOUNT_ID: string; // Vazio se não for TRANSFER
  VALUE: number;
}

// Estrutura padrão de uma Resposta GBTP
export interface GbtpResponse {
  STATUS: GbtpStatus;
  MESSAGE: string;
  BALANCE: number;
}