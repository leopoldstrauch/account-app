import { IEntryRepository } from "@/core/interfaces/IEntryRepository";
import { EntryInput } from "@/core/types/Entry";


export class CreateEntry {
  constructor(private entryRepository: IEntryRepository) {}

  async run(entry: EntryInput) {
    if (!entry.debitAccountId || !entry.creditAccountId) throw new Error('Accounts are required');
    if (entry.debitAccountId === entry.creditAccountId) throw new Error('Debit and Credit accounts cannot be the same');
    if (entry.amount <= 0) throw new Error('Amount must be greater than zero');
    return this.entryRepository.createEntry(entry);
  }
}
