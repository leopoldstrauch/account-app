// src/app/accounts/create/page.tsx
'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Button from '@/components/Button';
import { AccountInput } from '@/core/types/AccountInput';

export default function CreateAccountPage() {
  const [formData, setFormData] = useState<AccountInput>({
    name: '',
    type: 'asset',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createAccount = async () => {
    setError('');

    if (!formData.name) {
      setError('Name ist erforderlich.');
      return;
    }

    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({
        name: '',
        type: 'asset',
      });
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
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <SelectField
        label="Typ"
        name="type"
        value={formData.type}
        onChange={handleChange}
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
