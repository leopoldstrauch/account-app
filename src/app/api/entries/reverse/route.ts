// src/app/api/entries/reverse/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ReverseEntry } from '@/core/usecases/entries/ReverseEntry';
import { PrismaEntryRepository } from '@/core/repositories/PrismaEntryRepository';

const entryRepository = new PrismaEntryRepository();

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  const reverseEntry = new ReverseEntry(entryRepository);

  try {
    const entry = await reverseEntry.run(id);
    return NextResponse.json(entry);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}