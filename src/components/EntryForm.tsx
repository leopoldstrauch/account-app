import { Account } from '@/core/types/Account';
import InputField from './InputField';
import SelectField from './SelectField';
import Button from './Button';
import { useState } from 'react';
import { EntryInput } from '@/core/types/Entry';

interface EntryFormProps {
  accounts: Account[];
  editingEntry: EntryInput | null;
  onSave: (entry: EntryInput) => void;
  error: string;
  setError: (error: string) => void;
}

export default function EntryForm({ accounts, editingEntry, onSave, error, setError }: EntryFormProps) {
  const [formData, setFormData] = useState<EntryInput>({
    id: editingEntry?.id,
    debitAccountId: editingEntry?.debitAccountId ?? 0,
    creditAccountId: editingEntry?.creditAccountId ?? 0,
    amount: editingEntry?.amount ?? 0,
    date: editingEntry?.date ?? '',
    documentNumber: editingEntry?.documentNumber ?? '',
    description: editingEntry?.description ?? '',
    remark: editingEntry?.remark ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'debitAccountId' || name === 'creditAccountId' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <SelectField
        label="Sollkonto"
        name="debitAccountId"
        value={String(formData.debitAccountId)} // Wert in String umwandeln
        onChange={handleChange}
        options={accounts.map(account => ({ value: account.id, label: account.name }))}
      />
      <SelectField
        label="Habenkonto"
        name="creditAccountId"
        value={String(formData.creditAccountId)} // Wert in String umwandeln
        onChange={handleChange}
        options={accounts.map(account => ({ value: account.id, label: account.name }))}
      />
      <InputField
        label="Betrag"
        type="number"
        name="amount"
        value={String(formData.amount)} // Wert in String umwandeln
        onChange={handleChange}
      />
      <InputField
        label="Datum"
        type="date"
        name="date"
        value={formData.date.split('T')[0]}
        onChange={handleChange}
      />
      <InputField
        label="Belegnummer"
        name="documentNumber"
        value={formData.documentNumber}
        onChange={handleChange}
      />
      <InputField
        label="Beschreibung"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <InputField
        label="Anmerkung"
        name="remark"
        value={formData.remark}
        onChange={handleChange}
      />
      <Button type="submit" onClick={() => {}}>
        {editingEntry ? 'Buchungssatz aktualisieren' : 'Buchungssatz erstellen'}
      </Button>
    </form>
  );
}
