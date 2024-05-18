import { IEntryRepository } from '../../interfaces/IEntryRepository';

export class ListEntries {
  constructor(private entryRepository: IEntryRepository) {}

  async run() {
    return this.entryRepository.listEntries();
  }
}
