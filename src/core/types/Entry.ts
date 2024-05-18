export type Entry = {
    id: number;
    debitAccountId: number;
    creditAccountId: number;
    amount: number;
    status: string;
    date: Date;
    documentNumber: string;
    description: string;
    remark: string;
  };
  
  export type EntryInput = {
    debitAccountId: number;
    creditAccountId: number;
    amount: number;
    date: Date;
    documentNumber: string;
    description: string;
    remark: string;
  };
  