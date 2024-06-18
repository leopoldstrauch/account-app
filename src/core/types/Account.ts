import {AccountType} from "@/core/types/AccountType";

export interface Account {
    id: string;
    name: string;
    type: AccountType;
    debit: number;
    credit: number;
  }


