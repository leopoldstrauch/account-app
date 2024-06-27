import {AccountReadmodel} from "@/core/types/AccountReadmodel";


export interface IAccountRepository {
    internal_save(account: AccountReadmodel): Promise<void>;

    get(id: string): Promise<AccountReadmodel | null>;

    internal_delete(id: string): Promise<void>;

    getAll(): Promise<AccountReadmodel[]>;
}
