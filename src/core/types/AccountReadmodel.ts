import {AccountType} from "@/core/types/AccountType";

export interface AccountReadmodel {
    id: string;
    name: string;
    type: AccountType;
    debit: number;
    credit: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
