// src/core/interfaces/IEntryRepository.ts
import {Entry} from '../types/Entry';

export interface IEntryRepository {
    listEntries(): Promise<Entry[]>;
}