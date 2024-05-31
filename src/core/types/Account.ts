export interface Account {
    id: number;
    name: string;
    type: AccountType;
    debit: number;
    credit: number;
  }

  export type AccountType = 'asset' | 'liability' | 'income' | 'expense';
