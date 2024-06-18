// src/app/api/accounts/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {PrismaEventRepository} from '@/core/repositories/PrismaEventRepository';
import {CreateAccount} from '@/core/usecases/accounts/CreateAccount';
import {CreateAccountInput} from '@/core/types/CreateAccountInput';

const eventRepository: PrismaEventRepository = new PrismaEventRepository();
const createAccount: CreateAccount = new CreateAccount(eventRepository);

export async function POST(request: NextRequest) {
    try {
        const accountInput: CreateAccountInput = await request.json();
        await createAccount.run(accountInput);
        return NextResponse.json({message: 'Account created and event stored'});
    } catch (error: any) {
        console.error('Error:', error); // Debugging: Log the error
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
