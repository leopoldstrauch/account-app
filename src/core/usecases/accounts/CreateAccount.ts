// src/core/usecases/accounts/CreateAccount.ts
import { IAccountRepository } from '../../interfaces/IAccountRepository';
import { AccountInput } from '../../types/AccountInput';
import { Account } from '../../types/Account';

export class CreateAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async run(accountInput: AccountInput): Promise<Account> {
    return this.accountRepository.createAccount(accountInput);
  }
}
