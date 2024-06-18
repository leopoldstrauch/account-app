import {NextRequest, NextResponse} from 'next/server';
import {DeleteEntry} from '../../../../core/usecases/entries/DeleteEntry';
import {ReverseEntry} from '../../../../core/usecases/entries/ReverseEntry';
import {PrismaEntryRepository} from '@/core/repositories/PrismaEntryRepository';
import {Entry} from "@/core/types/Entry";

const entryRepository: PrismaEntryRepository = new PrismaEntryRepository();

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
    const id = Number(params.id);
    const deleteEntry: DeleteEntry = new DeleteEntry(entryRepository);
    try {
        await deleteEntry.run(id);
        return NextResponse.json({message: 'Entry deleted'});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export async function POST(request: NextRequest, {params}: { params: { id: string } }) {
    const id = Number(params.id);
    const reverseEntry: ReverseEntry = new ReverseEntry(params.id);
    try {
        const entry: Entry = await reverseEntry.run(id);
        return NextResponse.json(entry);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
