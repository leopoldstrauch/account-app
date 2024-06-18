import {AccountType} from "@/core/types/AccountType";

export interface AccountReadModel {
    id: string;
    name: string;
    type: AccountType;
    debit: number;
    credit: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
