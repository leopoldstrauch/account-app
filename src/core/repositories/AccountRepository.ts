// src/core/repositories/PrismaAccountRepository.ts
import { PrismaClient, Account as PrismaAccount } from '@prisma/client';
import { IAccountRepository } from '../interfaces/IAccountRepository';
import { CreateAccountInput } from '../types/CreateAccountInput';
import { Account, AccountType } from '../types/Account';
import prisma from '@/lib/prisma';


export class AccountRepository implements IAccountRepository {



  constructor() {
  }

  async listAccounts(): Promise<Account[]> {
    const accounts: PrismaAccount[] = await prisma.account.findMany();
    return accounts.map(this.toDomain);
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
