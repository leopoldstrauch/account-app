import { IEntryRepository } from '../../interfaces/IEntryRepository';

export class PostEntries {
  constructor(private entryRepository: IEntryRepository) {}

  async run() {
    await this.entryRepository.postEntries();
  }
}
