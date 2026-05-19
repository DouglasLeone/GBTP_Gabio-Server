
export class ProcessarMaximizacaoUseCase {

    private accounts = new Map([
        ["1234", { id: "1234", balance: 500 }],
        ["9999", { id: "9999", balance: 1000 }]
    ]);

    processar(req: any) {

        const acc = this.accounts.get(req.ACCOUNT_ID);

        switch (req.OPERATION) {

            case "BALANCE":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada"
                    };
                }

                return {
                    STATUS: "SUCCESS",
                    BALANCE: acc.balance
                };

            case "DEPOSIT":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada"
                    };
                }

                acc.balance += req.VALUE;

                return {
                    STATUS: "SUCCESS",
                    BALANCE: acc.balance
                };

            case "WITHDRAW":

                if (!acc) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta não encontrada"
                    };
                }

                if (acc.balance < req.VALUE) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Saldo insuficiente"
                    };
                }

                acc.balance -= req.VALUE;

                return {
                    STATUS: "SUCCESS",
                    BALANCE: acc.balance
                };

            case "TRANSFER":

                const to = this.accounts.get(req.TO_ACCOUNT_ID);

                if (!acc || !to) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Conta inexistente"
                    };
                }

                if (acc.balance < req.VALUE) {
                    return {
                        STATUS: "ERROR",
                        MESSAGE: "Saldo insuficiente"
                    };
                }

                acc.balance -= req.VALUE;
                to.balance += req.VALUE;

                return {
                    STATUS: "SUCCESS",
                    BALANCE: acc.balance
                };

            default:
                return {
                    STATUS: "ERROR",
                    MESSAGE: "Operação inválida"
                };
        }
    }
}