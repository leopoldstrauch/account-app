import {NextRequest, NextResponse} from 'next/server';
import {AccountRepository} from '@/core/repositories/AccountRepository';
import {CreateAccountCommand} from "@/core/usecases/account/AccoutCommands";
import {CreateAccountHandler} from "@/core/usecases/account/AccountCommandHandler";
import {PrismaEventRepository} from "@/core/repositories/EventRepository";


// Initialize Repositories
const accountRepository = new AccountRepository();
const eventRepository = new PrismaEventRepository();

export async function GET() {
    try {
        const accounts = await accountRepository.getAll();
        return NextResponse.json(accounts);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    const {name, type} = await request.json();
    const createAccountHandler = new CreateAccountHandler(eventRepository);

    const command: CreateAccountCommand = {name, type};

    try {
        await createAccountHandler.run(command);
        return NextResponse.json({message: 'Account created successfully'}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
