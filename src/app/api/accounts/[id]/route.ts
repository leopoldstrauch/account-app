// src/app/api/accounts/[id]/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {AccountRepository} from '@/core/repositories/AccountRepository';

const accountRepository: AccountRepository = new AccountRepository();

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
    try {
        await accountRepository.deleteAccount(params.id);
        return NextResponse.json({message: 'Konto erfolgreich gelöscht'});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}