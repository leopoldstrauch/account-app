// src/core/usecases/accounts/AccountCommands.ts

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
