// src/core/repositories/PrismaAccountRepository.ts
import { PrismaClient, Account as PrismaAccount } from '@prisma/client';
import { IAccountRepository } from '../interfaces/IAccountRepository';
import { AccountInput } from '../types/AccountInput';
import { Account, AccountType } from '../types/Account';
import prisma from '@/lib/prisma';


export class PrismaAccountRepository implements IAccountRepository {
  async createAccount(account: AccountInput): Promise<Account> {
    const createdAccount: PrismaAccount = await prisma.account.create({
      data: account,
    });

    return this.toDomain(createdAccount);
  }

  async listAccounts(): Promise<Account[]> {
    const accounts: PrismaAccount[] = await prisma.account.findMany();
    return accounts.map(this.toDomain);
  }

  async updateAccount(id: number, account: AccountInput): Promise<Account> {
    const updatedAccount: PrismaAccount = await prisma.account.update({
      where: { id },
      data: account,
    });

    return this.toDomain(updatedAccount);
  }

  async deleteAccount(id: number): Promise<void> {
    await prisma.account.delete({ where: { id } });
  }

  private toDomain(prismaAccount: PrismaAccount): Account {
    return {
      id: prismaAccount.id,
      name: prismaAccount.name,
      type: prismaAccount.type as AccountType, // Typumwandlung
      debit: prismaAccount.debit,
      credit: prismaAccount.credit,
    };
  }
}
