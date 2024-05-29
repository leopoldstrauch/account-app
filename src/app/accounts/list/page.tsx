'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Account } from '@/core/types/Account';

export default function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch('/api/accounts');
    const data = await response.json();
    setAccounts(data);
  };

  const deleteAccount = async (id: number) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Konto und alle damit verbundenen Buchungen löschen möchten?')) {
      return;
    }

    const res = await fetch('/api/accounts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();
    if (result.deletedAccount) {
      setAccounts(accounts.filter(account => account.id !== id));
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
          <p className="text-gray-700">Keine Konten vorhanden. Bitte erstellen Sie ein Konto.</p>
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
                <Button onClick={() => deleteAccount(account.id)} className="bg-red-600 hover:bg-red-700">
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
