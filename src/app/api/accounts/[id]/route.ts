import { NextRequest, NextResponse } from 'next/server';
import { DeleteAccount } from '../../../../core/usecases/accounts/DeleteAccount';
import { PrismaAccountRepository } from '@/core/repositories/PrismaAccountRepository';

const accountRepository = new PrismaAccountRepository();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const deleteAccount = new DeleteAccount(accountRepository);
  try {
    await deleteAccount.run(id);
    return NextResponse.json({ message: 'Account deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
