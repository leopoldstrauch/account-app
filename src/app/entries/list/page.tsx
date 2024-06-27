'use client';

import { useEffect, useState } from 'react';
import EntryList from '@/components/EntryList';
import { Entry } from '@/core/types/Entry';
import {AccountReadmodel} from "@/core/types/AccountReadmodel";

export default function EntriesListPage() {
  const [accounts, setAccounts] = useState<AccountReadmodel[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>(''); // Typ "string" hinzugefügt

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

  const handleEdit = (entry: Entry) => {
    // Edit functionality implementation here
  };

  const handleDelete = async (id: string) => {
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

  const handleReverseEntry = async (id: string) => {
    try {
      const response = await fetch('/api/entries/reverse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Rückbuchen');
      }

      const newEntry = await response.json();
      fetchEntries();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buchungssätze Übersicht</h1>
      {error && <p className="text-red-500">{error}</p>}
      <EntryList
        entries={entries}
        accounts={accounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReverse={handleReverseEntry}
      />
    </div>
  );
}