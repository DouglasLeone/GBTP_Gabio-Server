# Distribuição de Responsabilidades — Projeto GBTP Server

Repositório do projeto: [https://github.com/DouglasLeone/GBTP_Gabio-Server](https://github.com/DouglasLeone/GBTP_Gabio-Server)

## Integrantes e Responsabilidades

### Douglas

Responsável pela camada de comunicação e estrutura do servidor, incluindo configuração do servidor Node.js com TypeScript, implementação da comunicação via WebSocket, gerenciamento de conexões, recebimento e envio de mensagens, integração entre os módulos do sistema e inicialização da aplicação.

Implementado com sucesso ✅ --Criado branch

### Maria Clara

Responsável pela implementação do protocolo GBTP, incluindo interpretação e estruturação das mensagens, desenvolvimento do parser do protocolo, validação dos campos obrigatórios, criação das respostas padronizadas e definição dos tipos/interfaces utilizados na comunicação entre cliente e servidor.

### Alisson

Responsável pela camada de regras de negócio do sistema, incluindo implementação das operações bancárias (consulta de saldo, depósito, saque e transferência), gerenciamento das contas em memória e validações relacionadas às transações e regras do protocolo.

---

## Organização Arquitetural

O projeto foi dividido em três camadas principais:

* Comunicação
* Protocolo
* Regras de Negócio

Essa separação foi definida para reduzir acoplamento entre os módulos, facilitar a manutenção do código e permitir que os integrantes trabalhem em paralelo com menos conflitos durante o desenvolvimento.

---

## Fluxo de Funcionamento do Sistema

1. O cliente envia uma mensagem para o servidor.
2. A camada de comunicação recebe a mensagem via WebSocket.
3. O protocolo GBTP interpreta e valida os dados recebidos.
4. A camada de regras de negócio processa a operação solicitada.
5. O protocolo monta a resposta padronizada.
6. A camada de comunicação envia a resposta de volta ao cliente.

---

## Estrutura Base do Projeto

```txt
src/
│
├── Comunicacao/
├── Protocolo/
├── RegrasNegocio/
└── main.ts
```
