import { PrismaClient, Entry as PrismaEntry } from '@prisma/client';

import { Entry, EntryInput } from '../types/Entry';
import { IEntryRepository } from '../interfaces/IEntryRepository';

const prisma = new PrismaClient();

export class PrismaEntryRepository implements IEntryRepository {
    async createEntry(entry: EntryInput): Promise<Entry> {
        const createdEntry: PrismaEntry = await prisma.entry.create({
            data: entry,
        });

        return this.toDomain(createdEntry);
    }

    async listEntries(): Promise<Entry[]> {
        const entries: PrismaEntry[] = await prisma.entry.findMany();
        return entries.map(this.toDomain);
    }

    async postEntries(): Promise<void> {
        await prisma.entry.updateMany({
            where: { status: 'open' },
            data: { status: 'posted' },
        });
    }

    async reverseEntry(id: number): Promise<Entry> {
        const originalEntry = await prisma.entry.findUnique({ where: { id } });
        if (!originalEntry) {
            throw new Error(`Entry with id ${id} not found`);
        }

        const reversedEntry: PrismaEntry = await prisma.entry.create({
            data: {
                debitAccountId: originalEntry.creditAccountId,
                creditAccountId: originalEntry.debitAccountId,
                amount: originalEntry.amount,
                date: new Date(),
                documentNumber: `REV-${originalEntry.documentNumber}`,
                description: `Reversal of ${originalEntry.description}`,
                remark: `Reversed entry for original ID ${originalEntry.id}`,
                status: 'open',
            },
        });

        return this.toDomain(reversedEntry);
    }

    async deleteEntry(id: number): Promise<void> {
        await prisma.entry.delete({ where: { id } });
    }

    private toDomain(prismaEntry: PrismaEntry): Entry {
        return {
            id: prismaEntry.id,
            debitAccountId: prismaEntry.debitAccountId,
            creditAccountId: prismaEntry.creditAccountId,
            amount: prismaEntry.amount,
            status: prismaEntry.status,
            date: prismaEntry.date, // Keep as Date
            documentNumber: prismaEntry.documentNumber,
            description: prismaEntry.description,
            remark: prismaEntry.remark,
        };
    }
}
