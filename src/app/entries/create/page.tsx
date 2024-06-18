'use client';

import { useEffect, useState } from 'react';
import EntryForm from '@/components/EntryForm';
import { Account } from '@/core/types/Account';


export default function CreateEntryPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState<EntryInput | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch('/api/accounts');
    const data = await response.json();
    setAccounts(data);
  };

  const handleSaveEntry = async (entry: EntryInput) => {
    setError('');

    let response;
    if (entry.id) {
      response = await fetch('/api/entries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } else {
      response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    }

    const newEntry = await response.json();
    // Optionally redirect to the list page or reset form
    setEditingEntry(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buchungssatz erstellen</h1>
      {error && <p className="text-red-500">{error}</p>}
      <EntryForm
        accounts={accounts}
        editingEntry={editingEntry}
        onSave={handleSaveEntry}
        error={error}
        setError={setError}
      />
    </div>
  );
}
