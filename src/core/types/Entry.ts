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
  
  export interface EntryInput {
    id?: number;
    debitAccountId: number;
    creditAccountId: number;
    amount: number;
    date: string;
    documentNumber: string;
    description: string;
    remark: string;
  }
  