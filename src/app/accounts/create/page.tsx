// src/app/accounts/create/page.tsx
'use client';

import {useState} from 'react';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Button from '@/components/Button';
import {CreateAccountCommand} from "@/core/usecases/account/AccoutCommands";
import {AccountType} from "@/core/types/AccountType";

export default function CreateAccountPage() {
    const [name, setName] = useState('');
    const [type, setType] = useState<AccountType>(AccountType.Asset);
    const [error, setError] = useState('');

    const createAccount = async () => {
        setError('');

        if (!name) {
            setError('Name ist erforderlich.');
            return;
        }

        const accountInput: CreateAccountCommand = {name, type};

        try {
            const res = await fetch('/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountInput),
            });

            if (!res.ok) {
                throw new Error('Fehler beim Erstellen des Kontos');
            }

            setName('');
            setType(AccountType.Asset);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unbekannter Fehler');
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Konto erstellen</h1>
            {error && <p className="text-red-500">{error}</p>}
            <InputField
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <SelectField
                label="Typ"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value as AccountType)}
                options={[
                    {value: 'asset', label: 'Aktivkonto'},
                    {value: 'liability', label: 'Passivkonto'},
                    {value: 'income', label: 'Ertragskonto'},
                    {value: 'expense', label: 'Aufwandskonto'},
                ]}
            />
            <Button onClick={createAccount}>Konto erstellen</Button>
        </div>
    );
}
