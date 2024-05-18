import { IEntryRepository } from '../../interfaces/IEntryRepository';

export class DeleteEntry {
  constructor(private entryRepository: IEntryRepository) {}

  async run(id: number) {
    return this.entryRepository.deleteEntry(id);
  }
}
