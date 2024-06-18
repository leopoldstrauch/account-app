// src/core/types/Entry.ts
export type Entry = {
  id: string;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  status: EntryStatus;
  date: Date;
  documentNumber: string;
  description: string;
  remark: string;
};

// src/core/types/EntryStatus.ts
export enum EntryStatus {
  OPEN = 'open',
  POSTED = 'posted',
}