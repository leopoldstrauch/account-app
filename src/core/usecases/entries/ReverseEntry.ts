import { IEntryRepository } from '@/core/interfaces/IEntryRepository';
import { Entry } from '@/core/types/Entry';

export class ReverseEntry {
    constructor(private entryRepository: IEntryRepository) { }

    async run(id: number): Promise<Entry> {
        return this.entryRepository.reverseEntry(id);
    }
}
