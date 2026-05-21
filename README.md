# Projeto GBTP Server — Protocolo Gabio Bank Transaction Protocol

Repositório do projeto: [https://github.com/DouglasLeone/GBTP_Gabio-Server](https://github.com/DouglasLeone/GBTP_Gabio-Server)

## Integrantes e Responsabilidades

### Douglas ✅

Responsável pela camada de comunicação e estrutura do servidor, incluindo configuração do servidor Node.js com TypeScript, implementação da comunicação via WebSocket, gerenciamento de conexões, recebimento e envio de mensagens, integração entre os módulos do sistema e inicialização da aplicação.

**Status:** Implementado com sucesso ✅

### Maria Clara ✅

Responsável pela implementação do protocolo GBTP, incluindo interpretação e estruturação das mensagens, desenvolvimento do parser do protocolo, validação dos campos obrigatórios, criação das respostas padronizadas e definição dos tipos/interfaces utilizados na comunicação entre cliente e servidor.

**Status:** Implementado com sucesso ✅

### Alisson ✅

Responsável pela camada de regras de negócio do sistema, incluindo implementação das operações bancárias (consulta de saldo, depósito, saque e transferência), gerenciamento das contas em memória e validações relacionadas às transações e regras do protocolo.

**Status:** Implementado com sucesso ✅



## Estrutura Completa do Projeto

```txt
src/
│
├── Comunicacao/
│   └── comunicadorServer.ts       # Servidor WebSocket (transporte)
│
├── Protocolo/
│   ├── types.ts                   # Tipos e interfaces (GbtpRequest, GbtpResponse)
│   ├── GBTParser.ts              # Parser de requisições textual → objeto
│   └── GBTPResponse.ts           # Builder para serializar respostas
│
├── RegrasNegocio/
│   ├── Account.ts                # Repositório de contas em memória
│   └── ProcessAccountUseCase.ts  # Lógica das operações bancárias
│
└── main.ts                        # Inicialização e integração das camadas
```

---

## Protocolo GBTP (Gabio Bank Transaction Protocol)

### Formato de Requisição

Mensagens são estruturadas em pares CHAVE:VALOR, separadas por nova linha (`\n`):

```
OPERATION:BALANCE
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:0
```

#### Campos Obrigatórios

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `OPERATION` | Tipo de operação: BALANCE, DEPOSIT, WITHDRAW, TRANSFER | `BALANCE` |
| `ACCOUNT_ID` | Identificador da conta principal | `1001` |
| `TO_ACCOUNT_ID` | Identificador da conta de destino (vazio se não for TRANSFER) | `` ou `1002` |
| `VALUE` | Valor numérico da transação | `100.00` |

### Formato de Resposta

Todas as respostas seguem o mesmo padrão com três campos obrigatórios:

```
STATUS:OK
MESSAGE:Saldo consultado com sucesso
BALANCE:500.00
```

#### Campos de Resposta

| Campo | Descrição | Valores |
|-------|-----------|---------|
| `STATUS` | Resultado da operação | `OK` ou `ERROR` |
| `MESSAGE` | Mensagem descritiva | Texto descritivo |
| `BALANCE` | Saldo atual da conta principal | Número com 2 casas decimais |

### Operações Implementadas

#### 1. BALANCE (Consulta de Saldo)
```
Requisição:
OPERATION:BALANCE
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:0

Resposta (sucesso):
STATUS:OK
MESSAGE:Saldo consultado com sucesso
BALANCE:500.00
```

#### 2. DEPOSIT (Depósito)
```
Requisição:
OPERATION:DEPOSIT
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:100.00

Resposta (sucesso):
STATUS:OK
MESSAGE:Depósito realizado com sucesso
BALANCE:600.00
```

#### 3. WITHDRAW (Saque)
```
Requisição:
OPERATION:WITHDRAW
ACCOUNT_ID:1001
TO_ACCOUNT_ID:
VALUE:50.00

Resposta (sucesso):
STATUS:OK
MESSAGE:Saque efetuado
BALANCE:550.00

Resposta (erro - saldo insuficiente):
STATUS:ERROR
MESSAGE:Saldo insuficiente
BALANCE:550.00
```

#### 4. TRANSFER (Transferência)
```
Requisição:
OPERATION:TRANSFER
ACCOUNT_ID:1001
TO_ACCOUNT_ID:1002
VALUE:75.00

Resposta (sucesso):
STATUS:OK
MESSAGE:Transferência concluída
BALANCE:475.00

Resposta (erro - conta destino inexistente):
STATUS:ERROR
MESSAGE:Conta de destino inexistente
BALANCE:475.00
```

---

## Contas Fictícias Inicializadas

O sistema inicia com 3 contas de teste:

| ID | Saldo Inicial |
|----|---------------|
| 1001 | 500.00 |
| 1002 | 300.00 |
| 1003 | 1000.00 |

---

## Validações Implementadas

✅ **Campos obrigatórios presentes** na mensagem  
✅ **Valores não-negativos** para transações  
✅ **Formato válido** para VALUE (numérico)  
✅ **Existência de contas** antes de processar  
✅ **Saldo suficiente** para WITHDRAW e TRANSFER  
✅ **Conta de origem ≠ destino** em TRANSFER  
✅ **Operação válida** (entre BALANCE, DEPOSIT, WITHDRAW, TRANSFER)  

---

## Como Executar

### Instalação de Dependências

```bash
npm install
```

### Compilação

```bash
npm run build
```

Gera arquivos compilados em `dist/`

### Iniciar o Servidor

```bash
npm start
```

O servidor iniciará na porta **8080** e ficará aguardando conexões WebSocket.

Saída esperada:
```
[SERVIDOR] Websocket ouvindo na porta 8080
```

---

## Integração das Camadas

O fluxo completo de funcionamento:

1. **Cliente** envia mensagem textual via WebSocket
2. **ComunicadorServer** (Comunicação) recebe e chama o callback
3. **GBTParser** (Protocolo) converte string → `GbtpRequest`
4. **ProcessAccountUseCase** (Regras de Negócio) processa a operação
5. **GBTPResponseBuilder** (Protocolo) converte resultado → string GBTP
6. **ComunicadorServer** envia resposta ao cliente

---

## Cliente Web (Pendente)

Uma interface web HTML + TypeScript para enviar mensagens GBTP via WebSocket ainda precisa ser criada. Ela deverá:

- Permitir envio de requisições GBTP
- Exibir as respostas de forma legível
- Manter histórico de transações (opcional)
- Suportar as 4 operações bancárias

---

## Stack Tecnológico

- **Runtime:** Node.js
- **Linguagem:** TypeScript 5.x
- **WebSocket:** `ws` 8.x
- **Compilador:** TypeScript Compiler

---
