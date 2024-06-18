// src/core/repositories/AccountRepository.ts

import { IAccountRepository } from "@/core/interfaces/IAccountRepository";
import { PrismaClient } from "@prisma/client";
import {AccountReadModel} from "@/core/readmodel/AccountReadmodel";

export class AccountRepository implements IAccountRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async save(account: AccountReadModel): Promise<void> {
    await this.prisma.account.upsert({
      where: { id: account.id },
      update: {
        name: account.name,
        type: account.type,
        debit: account.debit,
        credit: account.credit,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        version: account.version,
      },
      create: {
        id: account.id,
        name: account.name,
        type: account.type,
        debit: account.debit,
        credit: account.credit,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        version: account.version,
      },
    });
  }

  async get(id: string): Promise<AccountReadModel | null> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) return null;
    return {
      id: account.id,
      name: account.name,
      type: account.type,
      debit: account.debit,
      credit: account.credit,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      version: account.version,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.account.delete({ where: { id } });
  }
}
