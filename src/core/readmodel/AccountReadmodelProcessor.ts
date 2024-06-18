import {IAccountRepository} from "@/core/interfaces/IAccountRepository";
import {EventType} from "@/core/types/EventType";
import {AccountType} from "@/core/types/AccountType";
import {EntryCreatedEvent} from "@/core/usecases/entry/EntryEvents";
import {AccountReadModel} from "@/core/readmodel/AccountReadmodel";
import {AccountCreatedEvent, AccountDeletedEvent, AccountNameUpdatedEvent} from "@/core/usecases/account/AccountEvents";

export class AccountReadModelProcessor {
    constructor(private accountRepository: IAccountRepository) {
    }

    async processEvent(event: any): Promise<void> {
        switch (event.type) {
            case EventType.AccountCreated:
                await this.handleAccountCreated(event as AccountCreatedEvent);
                break;
            case EventType.AccountDeleted:
                await this.handleAccountDeleted(event as AccountDeletedEvent);
                break;
            case EventType.AccountNameUpdated:
                await this.handleAccountNameUpdated(event as AccountNameUpdatedEvent);
                break;
            case EventType.EntryCreated:
                await this.handleEntryCreated(event as EntryCreatedEvent);
                break;
        }
    }

    private async handleAccountCreated(event: AccountCreatedEvent): Promise<void> {
        const account: AccountReadModel = {
            id: event.entityId,
            name: event.data.name,
            type: event.data.type,
            debit: 0,
            credit: 0,
            createdAt: event.timestamp,
            updatedAt: event.timestamp,
            version: event.sequence,
        };
        await this.accountRepository.save(event.entityId);
    }

    private async handleAccountDeleted(event: AccountDeletedEvent): Promise<void> {
        await this.accountRepository.delete(event.entityId);
    }

    private async handleAccountNameUpdated(event: AccountNameUpdatedEvent): Promise<void> {
        const account = await this.accountRepository.get(event.entityId);
        account.name = event.data.newName;
        account.updatedAt = event.timestamp;
        account.version = event.sequence;
        await this.accountRepository.save(account);
    }

    private async handleEntryCreated(event: EntryCreatedEvent): Promise<void> {
        const debitAccount = await this.accountRepository.get(event.data.debitAccountId);
        const creditAccount = await this.accountRepository.get(event.data.creditAccountId);

        if (!debitAccount || !creditAccount) {
            throw new Error('Both accounts must exist');
        }

        // Update debit and credit totals based on account types
        if (debitAccount.type === AccountType.Asset || debitAccount.type === AccountType.Expense) {
            debitAccount.debit += event.data.amount;
        } else {
            debitAccount.credit += event.data.amount;
        }

        if (creditAccount.type === AccountType.Liability || creditAccount.type === AccountType.Income) {
            creditAccount.credit += event.data.amount;
        } else {
            creditAccount.debit += event.data.amount;
        }

        debitAccount.updatedAt = event.timestamp;
        debitAccount.version = event.sequence;
        creditAccount.updatedAt = event.timestamp;
        creditAccount.version = event.sequence;

        await this.accountRepository.save(debitAccount);
        await this.accountRepository.save(creditAccount);
    }
}
