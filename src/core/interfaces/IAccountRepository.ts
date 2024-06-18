// src/core/interfaces/IAccountRepository.ts
import {Account} from '../types/Account';

export interface IAccountRepository {
    listAccounts(): Promise<Account[]>;

    getAccount(entityId: string): any;

    save(entityId: string): any;

    delete(entityId: string): any;

    get(entityId: any): any;
}
