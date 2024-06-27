// src/app/accounts/list/page.tsx
'use client';

import {useEffect, useState} from 'react';
import Button from '@/components/Button';
import {AccountReadmodel} from "@/core/types/AccountReadmodel";

export default function AccountListPage() {
    const [accounts, setAccounts] = useState<AccountReadmodel[]>([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch('/api/accounts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            setError('Fehler beim Laden der Konten');
            console.error('Failed to fetch accounts:', error);
        }
    };

    const deleteAccount = async (id: string) => {
        if (!confirm('Sind Sie sicher, dass Sie dieses Konto und alle damit verbundenen Buchungen löschen möchten?')) {
            return;
        }

        const res = await fetch(`/api/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            fetchAccounts();
            setMessage('Konto erfolgreich gelöscht.');
        } else {
            setError('Fehler beim Löschen des Kontos.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Konten Übersicht</h1>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <div className="bg-white p-4 rounded shadow">
                {accounts.length === 0 ? (
                    <p className="text-gray-700">Keine Konten vorhanden.</p>
                ) : (
                    <ul className="space-y-2">
                        {accounts.map(account => (
                            <li key={account.id} className="p-4 border rounded flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium">{account.name}</h3>
                                    <p>Typ: {account.type}</p>
                                    <p>Soll: {account.debit}</p>
                                    <p>Haben: {account.credit}</p>
                                </div>
                                <Button onClick={() => deleteAccount(account.id)}
                                        className="bg-red-600 hover:bg-red-700">
                                    Löschen
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
