import { IAccountRepository } from '../../interfaces/IAccountRepository';

export class ListAccounts {
  constructor(private accountRepository: IAccountRepository) {}

  async run() {
    return this.accountRepository.listAccounts();
  }
}
