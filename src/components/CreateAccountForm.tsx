import { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import Button from './Button';
import { Account } from '@/core/types/Account';

type CreateAccountFormProps = {
  accounts: Account[];
  onCreate: (name: string, type: string) => void;
  error: string;
  setError: (error: string) => void;
};

export default function CreateAccountForm({ accounts, onCreate, error, setError }: CreateAccountFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('asset');

  const handleSubmit = () => {
    setError('');

    if (!name) {
      setError('Name ist erforderlich.');
      return;
    }

    if (accounts.some(account => account.name === name)) {
      setError('Ein Konto mit demselben Namen existiert bereits.');
      return;
    }

    onCreate(name, type);
    setName('');
    setType('asset');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Konto erstellen</h2>
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        label="Name"
        name="accountName" // Hinzugefügt: name-Eigenschaft
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
      <Button onClick={handleSubmit}>
        Konto erstellen
      </Button>
    </div>
  );
}
