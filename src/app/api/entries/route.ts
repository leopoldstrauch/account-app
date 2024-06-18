import {NextApiRequest, NextApiResponse} from 'next';
import {EventRepository} from "@/core/repositories/EventRepository";
import {AccountRepository} from "@/core/repositories/AccountRepository";
import {PrismaClient} from "@prisma/client";
import {CreateEntryHandler} from "@/core/usecases/entry/EntryCommandHandler";
import {AccountReadModelProcessor} from "@/core/readmodel/AccountReadmodelProcessor";
import {CreateEntryCommand} from "@/core/usecases/entry/EntryCommands";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Repositories
const eventRepository = new EventRepository(prisma);
const accountRepository = new AccountRepository(prisma);

// Initialize Handlers
const createEntryHandler = new CreateEntryHandler(eventRepository);
const accountReadModelProcessor = new AccountReadModelProcessor(accountRepository);

export default async function createEntry(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const {debitAccountId, creditAccountId, amount, description} = req.body;

    const command: CreateEntryCommand = {debitAccountId, creditAccountId, amount, description};

    try {
        await createEntryHandler.run(command);

        // Process the events to update the read models
        const events = await eventRepository.getEventsByEntityId(command.entityId); // This method needs to be implemented
        for (const event of events) {
            await accountReadModelProcessor.processEvent(event);
        }

        res.status(201).json({message: 'Entry created and read model updated successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
