import {IEventRepository} from "@/core/interfaces/IEventRepository";

import {AccountCreatedEvent, AccountDeletedEvent, AccountNameUpdatedEvent} from "@/core/usecases/account/AccountEvents";
import {v4 as uuidv4} from "uuid";
import {
    CreateAccountCommand,
    DeleteAccountCommand,
    UpdateAccountNameCommand
} from "@/core/usecases/account/AccoutCommands";

export class CreateAccountHandler {
    constructor(private eventRepository: IEventRepository) {
    }

    async run(command: CreateAccountCommand): Promise<void> {
        const event = new AccountCreatedEvent(0, uuidv4(), {name: command.name, type: command.type});
        await this.eventRepository.createEvent(event);
    }
}

export class DeleteAccountHandler {
    constructor(private eventRepository: IEventRepository) {
    }

    async run(command: DeleteAccountCommand): Promise<void> {
        const event = new AccountDeletedEvent(0, command.entityId);
        await this.eventRepository.createEvent(event);
    }
}

export class UpdateAccountNameHandler {
    constructor(private eventRepository: IEventRepository) {
    }

    async run(command: UpdateAccountNameCommand): Promise<void> {
        const event = new AccountNameUpdatedEvent(0, command.entityId, {newName: command.newName});
        await this.eventRepository.createEvent(event);
    }
}
