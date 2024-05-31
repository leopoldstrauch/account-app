import { IEntryRepository } from '@/core/interfaces/IEntryRepository';
import { EntryStatus } from '@/core/types/Entry';

export class ReverseEntry {
  constructor(private entryRepository: IEntryRepository) {}

  async run(id: number) {
    const originalEntry = await this.entryRepository.findEntryById(id);
    if (!originalEntry) {
      throw new Error(`Entry with id ${id} not found`);
    }

    const reversedEntry = await this.entryRepository.createEntry({
      debitAccountId: originalEntry.creditAccountId,
      creditAccountId: originalEntry.debitAccountId,
      amount: originalEntry.amount,
      date: new Date(),
      documentNumber: `REV-${originalEntry.documentNumber}`,
      description: `Reversal of ${originalEntry.description}`,
      remark: `Reversed entry for original ID ${originalEntry.id}`,
      status: EntryStatus.OPEN,
    });

    return reversedEntry;
  }
}