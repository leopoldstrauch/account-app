// src/core/usecases/entries/EntryCommands.ts

export type CreateEntryCommand = {

    entryNumber: string;
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description: string;
    note?: string;
    date: Date;
};
