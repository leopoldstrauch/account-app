import { IEntryRepository } from '@/core/interfaces/IEntryRepository';

export class DeleteEntry {
  constructor(private entryRepository: IEntryRepository) {}

  async run(id: number): Promise<void> {
    return this.entryRepository.deleteEntry(id);
  }
}
