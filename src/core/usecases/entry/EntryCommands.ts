// src/core/usecases/entries/EntryCommands.ts

export type CreateEntryCommand = {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description?: string;
};
