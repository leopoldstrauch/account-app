import { IAccountRepository } from '../../interfaces/IAccountRepository';

export class DeleteAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async run(id: number) {
    if (!id) throw new Error('ID is required');
    return this.accountRepository.deleteAccount(id);
  }
}
