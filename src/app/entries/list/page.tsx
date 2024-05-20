// src/app/entries/list/page.tsx

'use client';

import { useEffect, useState } from 'react';
import EntryList from '@/components/EntryList';
import { Account } from '@/core/types/Account';
import { Entry } from '@/core/types/Entry';

export default function EntryListPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetchAccounts();
    fetchEntries();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch('/api/accounts');
    const data = await response.json();
    setAccounts(data);
  };

  const fetchEntries = async () => {
    const response = await fetch('/api/entries');
    const data = await response.json();
    setEntries(data);
  };

  const handleEditEntry = (entry: Entry) => {
    // Handle edit entry (you can use router to navigate to edit page)
  };

  const handleDeleteEntry = async (id: number) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Buchungssatz löschen möchten?')) {
      return;
    }

    await fetch('/api/entries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    fetchEntries();
  };

  const handleReverseEntry = async (id: number) => {
    const response = await fetch('/api/entries/reverse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const newEntry = await response.json();
    fetchEntries();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buchungssätze Übersicht</h1>
      <EntryList
        entries={entries}
        accounts={accounts}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
        onReverse={handleReverseEntry}
      />
    </div>
  );
}
