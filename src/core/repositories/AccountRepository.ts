import {IAccountRepository} from "@/core/interfaces/IAccountRepository";
import {AccountReadmodel} from "@/core/types/AccountReadmodel";
import {AccountType} from "@/core/types/AccountType";
import prisma from "@/lib/prisma";

export class AccountRepository implements IAccountRepository {

    async get(id: string): Promise<AccountReadmodel | null> {
        const account = await prisma.account.findUnique({where: {id}});
        if (!account) return null;
        return {
            id: account.id,
            name: account.name,
            type: account.type as AccountType,
            debit: account.debit,
            credit: account.credit,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            version: account.version
        };
    }

    async getAll(): Promise<AccountReadmodel[]> {
        const accounts = await prisma.account.findMany();
        return accounts.map(account => ({
            id: account.id,
            name: account.name,
            type: account.type as AccountType,
            debit: account.debit,
            credit: account.credit,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            version: account.version,
        }));
    }

    internal_delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
        //TODO impelement me
    }

    internal_save(account: AccountReadmodel): Promise<void> {
        return Promise.resolve(undefined);
        //TODO impelement me
    }
}
