import { AccountRepository } from "./Account";
import { GbtpRequest, GbtpResponse } from "../Protocolo/types";

export class ProcessarMaximizacaoUseCase {

    constructor(
        private repository: AccountRepository
    ) {}

    processar(req: GbtpRequest): GbtpResponse {

        const acc = this.repository.findById(req.ACCOUNT_ID);

        switch (req.OPERATION) {

            case "BALANCE":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada",
                        BALANCE: 0
                    };
                }

                return {
                    STATUS: "OK",
                    MESSAGE: "Saldo consultado com sucesso",
                    BALANCE: acc.balance
                };

            case "DEPOSIT":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada",
                        BALANCE: 0
                    };
                }

                acc.balance += req.VALUE;

                this.repository.update(acc);

                return {
                    STATUS: "OK",
                    MESSAGE: "Depósito realizado com sucesso",
                    BALANCE: acc.balance
                };

            case "WITHDRAW":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada",
                        BALANCE: 0
                    };
                }

                if (acc.balance < req.VALUE) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Saldo insuficiente",
                        BALANCE: acc.balance
                    };
                }

                acc.balance -= req.VALUE;

                this.repository.update(acc);

                return {
                    STATUS: "OK",
                    MESSAGE: "Saque efetuado",
                    BALANCE: acc.balance
                };

            case "TRANSFER":

                const to = this.repository.findById(req.TO_ACCOUNT_ID);

                if (!acc || !to) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta inexistente",
                        BALANCE: acc ? acc.balance : 0
                    };
                }

                if (acc.balance < req.VALUE) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Saldo insuficiente",
                        BALANCE: acc.balance
                    };
                }

                acc.balance -= req.VALUE;
                to.balance += req.VALUE;

                this.repository.update(acc);
                this.repository.update(to);

                return {
                    STATUS: "OK",
                    MESSAGE: "Transferência concluída",
                    BALANCE: acc.balance
                };

            default:

                return {
                    STATUS: "ERROR",
                    MESSAGE: "Operação inválida",
                    BALANCE: 0
                };
        }
    }
}