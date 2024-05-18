import { IAccountRepository } from '../../interfaces/IAccountRepository';

export class CreateAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async run(name: string, type: string) {
    if (!name) throw new Error('Name is required');
    return this.accountRepository.createAccount(name, type);
  }
}
