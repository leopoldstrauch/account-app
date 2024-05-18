import { Entry, EntryInput } from '../types/Entry';

export interface IEntryRepository {
  createEntry(entry: EntryInput): Promise<Entry>;
  listEntries(): Promise<Entry[]>;
  postEntries(): Promise<void>;
  reverseEntry(id: number): Promise<Entry>;
  deleteEntry(id: number): Promise<void>;
}
