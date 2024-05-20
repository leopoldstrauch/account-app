'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Button from '@/components/Button';

export default function CreateAccountPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('asset');
  const [error, setError] = useState('');

  const createAccount = async () => {
    setError('');

    if (!name) {
      setError('Name ist erforderlich.');
      return;
    }

    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type }),
    });

    if (res.ok) {
      setName('');
      setType('asset');
    } else {
      setError('Fehler beim Erstellen des Kontos.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Konto erstellen</h1>
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SelectField
        label="Typ"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { value: 'asset', label: 'Aktivkonto' },
          { value: 'liability', label: 'Passivkonto' },
          { value: 'income', label: 'Ertragskonto' },
          { value: 'expense', label: 'Aufwandskonto' },
        ]}
      />
      <Button onClick={createAccount}>
        Konto erstellen
      </Button>
    </div>
  );
}
