import { IEventRepository } from "@/core/interfaces/IEventRepository";
import { CreateEntryCommand } from "@/core/usecases/entry/EntryCommands";
import { EntryCreatedEvent } from "@/core/usecases/entry/EntryEvents";
import { v4 as uuidv4 } from "uuid";

export class CreateEntryHandler {
    constructor(private eventRepository: IEventRepository) {}

    async run(command: CreateEntryCommand): Promise<void> {
        const event = new EntryCreatedEvent(0, uuidv4(), {
            debitAccountId: command.debitAccountId,
            creditAccountId: command.creditAccountId,
            amount: command.amount,
            description: command.description
        });
        await this.eventRepository.createEvent(event);
    }
}
