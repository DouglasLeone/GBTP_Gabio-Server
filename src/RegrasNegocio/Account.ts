type Account = {
    id: string;
    balance: number;
};

export class AccountRepository {

    private accounts = new Map<string, Account>();

    constructor() {

        this.accounts.set("1234", {
            id: "1234",
            balance: 250
        });

        this.accounts.set("5678", {
            id: "5678",
            balance: 500
        });
    }

    public findById(id: string): Account | undefined {
        return this.accounts.get(id);
    }

    public update(account: Account): void {
        this.accounts.set(account.id, account);
    }
}