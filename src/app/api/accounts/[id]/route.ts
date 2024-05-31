// src/app/api/accounts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaAccountRepository } from '@/core/repositories/PrismaAccountRepository';

const accountRepository = new PrismaAccountRepository();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    await accountRepository.deleteAccount(id);
    return NextResponse.json({ message: 'Konto erfolgreich gelöscht' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}