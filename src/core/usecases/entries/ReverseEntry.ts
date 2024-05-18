import { IEntryRepository } from '../../interfaces/IEntryRepository';

export class ReverseEntry {
  constructor(private entryRepository: IEntryRepository) {}

  async run(id: number) {
    return this.entryRepository.reverseEntry(id);
  }
}
