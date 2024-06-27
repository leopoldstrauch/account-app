import {NextApiRequest} from 'next';

import {CreateEntryHandler} from "@/core/usecases/entry/EntryCommandHandler";
import {CreateEntryCommand} from "@/core/usecases/entry/EntryCommands";
import {PrismaEventRepository} from "@/core/repositories/EventRepository";
import {NextResponse} from "next/server";

// Initialize Repositories
const eventRepository = new PrismaEventRepository();
const createEntryHandler = new CreateEntryHandler(eventRepository);

export async function POST(req: NextApiRequest) {
    const {entryNumber, debitAccountId, creditAccountId, amount, description, note, date} = req.body;

    const command: CreateEntryCommand = {entryNumber, debitAccountId, creditAccountId, amount, description, note, date};

    try {
        await createEntryHandler.run(command);
        return NextResponse.json({message: 'Entry created successfully'}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
