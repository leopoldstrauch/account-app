import {AccountType} from "@/core/types/AccountType";

export type CreateAccountCommand = {
    name: string;
    type: AccountType;
};

export type DeleteAccountCommand = {
    entityId: string;
};

export type UpdateAccountNameCommand = {
    entityId: string;
    newName: string;
};

export type CreateEntryCommand = {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description?: string;
};
