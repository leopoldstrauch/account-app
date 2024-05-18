import { NextRequest, NextResponse } from 'next/server';
import { PrismaEntryRepository } from '@/core/repositories/PrismaEntryRepository';
import { CreateEntry } from '@/core/usecases/entries/CreateEntry';
import { PostEntries } from '@/core/usecases/entries/PostEntry';
import { ListEntries } from '@/core/usecases/entries/ListEntry';


const entryRepository = new PrismaEntryRepository();

export async function GET() {
  const listEntries = new ListEntries(entryRepository);
  const entries = await listEntries.run();
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const entryData = await request.json();
  const createEntry = new CreateEntry(entryRepository);
  try {
    const entry = await createEntry.run(entryData);
    return NextResponse.json(entry);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH() {
  const postEntries = new PostEntries(entryRepository);
  try {
    await postEntries.run();
    return NextResponse.json({ message: 'Entries posted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}