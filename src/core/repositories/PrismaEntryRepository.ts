// src/core/repositories/PrismaEntryRepository.ts
import { PrismaClient, Entry as PrismaEntry } from '@prisma/client';
import { IEntryRepository } from '../interfaces/IEntryRepository';
import { Entry, EntryStatus } from '../types/Entry';
import prisma from '@/lib/prisma';
import { EntryInput } from '../types/EntryInput';


export class PrismaEntryRepository implements IEntryRepository {
  async createEntry(entry: EntryInput): Promise<Entry> {
    const createdEntry: PrismaEntry = await prisma.entry.create({
      data: {
        ...entry,
        date: new Date(entry.date),
      },
    });

    return this.toDomain(createdEntry);
  }

  async listEntries(): Promise<Entry[]> {
    const entries: PrismaEntry[] = await prisma.entry.findMany();
    return entries.map(this.toDomain);
  }

  async postEntries(): Promise<void> {
    await prisma.entry.updateMany({
      where: { status: EntryStatus.OPEN },
      data: { status: EntryStatus.POSTED },
    });
  }

  async reverseEntry(id: number): Promise<Entry> {
    const originalEntry = await this.findEntryById(id);
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
        status: EntryStatus.OPEN,
      },
    });

    return this.toDomain(reversedEntry);
  }

  async deleteEntry(id: number): Promise<void> {
    await prisma.entry.delete({ where: { id } });
  }

  async findEntryById(id: number): Promise<Entry | null> {
    const prismaEntry = await prisma.entry.findUnique({ where: { id } });
    return prismaEntry ? this.toDomain(prismaEntry) : null;
  }

  private toDomain(prismaEntry: PrismaEntry): Entry {
    return {
      id: prismaEntry.id,
      debitAccountId: prismaEntry.debitAccountId,
      creditAccountId: prismaEntry.creditAccountId,
      amount: prismaEntry.amount,
      status: prismaEntry.status as EntryStatus,
      date: prismaEntry.date,
      documentNumber: prismaEntry.documentNumber,
      description: prismaEntry.description,
      remark: prismaEntry.remark,
    };
  }
}