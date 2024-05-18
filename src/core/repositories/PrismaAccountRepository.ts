import { Account, PrismaClient } from '@prisma/client';
import { IAccountRepository } from '../interfaces/IAccountRepository';

const prisma = new PrismaClient();

export class PrismaAccountRepository implements IAccountRepository {
  async createAccount(name: string, type: string): Promise<Account> {
    return prisma.account.create({
      data: { name, type },
    });
  }

  async deleteAccount(id: number): Promise<void> {
    await prisma.account.delete({ where: { id } });
  }

  async listAccounts(): Promise<Account[]> {
    return prisma.account.findMany();
  }
}
