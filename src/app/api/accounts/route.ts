import { NextApiRequest, NextApiResponse } from 'next';
import { EventRepository } from "@/core/repositories/EventRepository";
import { AccountRepository } from "@/core/repositories/AccountRepository";
import { PrismaClient } from "@prisma/client";
import { AccountType } from "@/core/types/AccountType";
import {CreateAccountHandler} from "@/core/usecases/account/AccountCommandHandler";
import {AccountReadModelProcessor} from "@/core/readmodel/AccountReadmodelProcessor";
import {CreateAccountCommand} from "@/core/usecases/account/AccoutCommands";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Repositories
const eventRepository = new EventRepository(prisma);
const accountRepository = new AccountRepository(prisma);

// Initialize Handlers
const createAccountHandler = new CreateAccountHandler(eventRepository);
const accountReadModelProcessor = new AccountReadModelProcessor(accountRepository);

export default async function createAccount(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { name, type } = req.body;

    const command: CreateAccountCommand = { name, type: type as AccountType };

    try {
        await createAccountHandler.run(command);

        // Process the events to update the read models
        const events = await eventRepository.getEventsByEntityId(command.entityId); // This method needs to be implemented
        for (const event of events) {
            await accountReadModelProcessor.processEvent(event);
        }

        res.status(201).json({ message: 'Account created and read model updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
