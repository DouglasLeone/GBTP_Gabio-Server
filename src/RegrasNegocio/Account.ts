type Account = {
    id: string;
    balance: number;
};

export class AccountRepository {

    private accounts = new Map<string, Account>();

    constructor() {

        this.accounts.set("1001", {
            id: "1001",
            balance: 500
        });

        this.accounts.set("1002", {
            id: "1002",
            balance: 300
        });

        this.accounts.set("1003", {
            id: "1003",
            balance: 1000
        });
    }

    public findById(id: string): Account | undefined {
        return this.accounts.get(id);
    }

    public update(account: Account): void {
        this.accounts.set(account.id, account);
    }
}