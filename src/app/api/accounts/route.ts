import { NextRequest, NextResponse } from 'next/server';
import { CreateAccount } from '../../../core/usecases/accounts/CreateAccount';
import { ListAccounts } from '../../../core/usecases/accounts/ListAccounts';
import { PrismaAccountRepository } from '@/core/repositories/PrismaAccountRepository';

const accountRepository = new PrismaAccountRepository();

export async function GET() {
  const listAccounts = new ListAccounts(accountRepository);
  const accounts = await listAccounts.run();
  return NextResponse.json(accounts);
}

export async function POST(request: NextRequest) {
  const { name, type } = await request.json();
  const createAccount = new CreateAccount(accountRepository);
  try {
    const account = await createAccount.run(name, type);
    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
