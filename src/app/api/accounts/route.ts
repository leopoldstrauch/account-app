// src/app/api/accounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaAccountRepository } from '@/core/repositories/PrismaAccountRepository';
import { CreateAccount } from '@/core/usecases/accounts/CreateAccount';
import { AccountInput } from '@/core/types/AccountInput';

const accountRepository = new PrismaAccountRepository();

export async function POST(request: NextRequest) {
  const accountInput: AccountInput = await request.json();
  const createAccount = new CreateAccount(accountRepository);
  try {
    const account = await createAccount.run(accountInput);
    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const accounts = await accountRepository.listAccounts();
    return NextResponse.json(accounts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}