export type CreateEntryCommand = {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description?: string;
};
