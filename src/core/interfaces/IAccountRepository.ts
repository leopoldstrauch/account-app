// src/core/interfaces/IAccountRepository.ts
import { Account } from '../types/Account';
import { AccountInput } from '../types/AccountInput';

export interface IAccountRepository {
  createAccount(account: AccountInput): Promise<Account>;
  listAccounts(): Promise<Account[]>;
  updateAccount(id: number, account: AccountInput): Promise<Account>;
  deleteAccount(id: number): Promise<void>;
}
