"use client";

import { useEffect, useState } from 'react';
import CreateAccountForm from '@/components/CreateAccountForm';
import AccountList from '@/components/AccountList';
import { Account } from '@/core/types/Account';

export default function Accounts() {
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

  const createAccount = async (name: string, type: string) => {
    setError('');

    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type }),
    });
    const newAccount = await res.json();
    setAccounts([...accounts, newAccount]);
    setMessage('Konto erfolgreich erstellt.');
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kontoverwaltung</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <CreateAccountForm accounts={accounts} onCreate={createAccount} error={error} setError={setError} />
      <h2 className="text-xl font-semibold mb-2">Kontoliste</h2>
      <AccountList accounts={accounts} onDelete={deleteAccount} />
    </div>
  );
}
