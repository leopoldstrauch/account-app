// src/core/interfaces/IEntryRepository.ts
import { Entry} from '../types/Entry';
import { EntryInput } from '../types/EntryInput';

export interface IEntryRepository {
  createEntry(entry: EntryInput): Promise<Entry>;
  listEntries(): Promise<Entry[]>;
  postEntries(): Promise<void>;
  reverseEntry(id: number): Promise<Entry>;
  deleteEntry(id: number): Promise<void>;
  findEntryById(id: number): Promise<Entry | null>;
}