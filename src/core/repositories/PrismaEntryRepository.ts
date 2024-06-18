// src/core/repositories/PrismaEntryRepository.ts
import { PrismaClient, Entry as PrismaEntry } from '@prisma/client';
import { IEntryRepository } from '../interfaces/IEntryRepository';
import { Entry, EntryStatus } from '../types/Entry';
import prisma from '@/lib/prisma';
import { EntryInput } from '../types/EntryInput';


export class PrismaEntryRepository implements IEntryRepository {

  async listEntries(): Promise<Entry[]> {
    const entries: PrismaEntry[] = await prisma.entry.findMany();
    return entries.map(this.toDomain);
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