import {NextRequest, NextResponse} from 'next/server';
import {PrismaEntryRepository} from '@/core/repositories/PrismaEntryRepository';
import {CreateEntry} from '@/core/usecases/entries/CreateEntry';
import {PostEntries} from '@/core/usecases/entries/PostEntry';
import {ListEntries} from '@/core/usecases/entries/ListEntry';
import {Entry} from "@/core/types/Entry";


const entryRepository:PrismaEntryRepository = new PrismaEntryRepository();

export async function GET() {
    const listEntries: ListEntries = new ListEntries(entryRepository);
    const entries: Entry[] = await listEntries.run();
    return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
    const entryData = await request.json();
    const createEntry: CreateEntry = new CreateEntry(entryRepository);
    try {
        const entry: Entry = await createEntry.run(entryData);
        return NextResponse.json(entry);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export async function PATCH() {
    const postEntries: PostEntries = new PostEntries(entryRepository);
    try {
        await postEntries.run();
        return NextResponse.json({message: 'Entries posted'});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}