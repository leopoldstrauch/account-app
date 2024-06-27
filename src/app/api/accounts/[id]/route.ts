// src/app/api/accounts/[id]/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {DeleteAccountHandler} from "@/core/usecases/account/AccountCommandHandler";
import {DeleteAccountCommand} from "@/core/usecases/account/AccoutCommands";
import {PrismaEventRepository} from "@/core/repositories/EventRepository";

const eventRepository = new PrismaEventRepository();

export async function DELETE(request: NextRequest) {
    const {entityId} = await request.json();
    const deleteAccountHandler = new DeleteAccountHandler(eventRepository);

    const command: DeleteAccountCommand = {entityId}

    try {
        await deleteAccountHandler.run(command);
        return NextResponse.json({message: 'Account deleted successfully'}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}