// src/core/interfaces/IAccountRepository.ts

import { AccountReadModel } from "@/core/readmodels/AccountReadModel";

export interface IAccountRepository {
    save(account: AccountReadModel): Promise<void>;
    get(id: string): Promise<AccountReadModel | null>;
    delete(id: string): Promise<void>;
}
