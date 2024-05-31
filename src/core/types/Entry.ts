// src/core/types/Entry.ts
export type Entry = {
  id: number;
  debitAccountId: number;
  creditAccountId: number;
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