export interface IAccountRepository {
    createAccount(name: string, type: string): Promise<Account>;
    deleteAccount(id: number): Promise<void>;
    listAccounts(): Promise<Account[]>;
  }
  
  export type Account = {
    id: number;
    name: string;
    type: string;
    debit: number;
    credit: number;
  };
  