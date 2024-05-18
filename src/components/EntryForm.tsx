import { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import Button from './Button';
import { Account } from '../core/types/Account';
import { Entry } from '../core/types/Entry';

type EntryInput = Omit<Entry, 'id' | 'status'> & { id?: number };

type EntryFormProps = {
  accounts: Account[];
  editingEntry?: Entry | null;
  onSave: (entry: EntryInput) => void;
  error: string;
  setError: (error: string) => void;
};

export default function EntryForm({ accounts, editingEntry, onSave, error, setError }: EntryFormProps) {
  const [debitAccountId, setDebitAccountId] = useState<number | null>(null);
  const [creditAccountId, setCreditAccountId] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [description, setDescription] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    if (editingEntry) {
      setDebitAccountId(editingEntry.debitAccountId);
      setCreditAccountId(editingEntry.creditAccountId);
      setAmount(editingEntry.amount);
      setDate(new Date(editingEntry.date).toISOString().split('T')[0]);
      setDocumentNumber(editingEntry.documentNumber);
      setDescription(editingEntry.description);
      setRemark(editingEntry.remark);
    } else {
      resetForm();
    }
  }, [editingEntry]);

  const resetForm = () => {
    setDebitAccountId(null);
    setCreditAccountId(null);
    setAmount(0);
    setDate('');
    setDocumentNumber('');
    setDescription('');
    setRemark('');
  };

  const handleSubmit = () => {
    setError('');

    if (debitAccountId === null || creditAccountId === null) {
      setError('Bitte wählen Sie sowohl Soll- als auch Habenkonten aus.');
      return;
    }

    if (debitAccountId === creditAccountId) {
      setError('Soll- und Habenkonten dürfen nicht identisch sein.');
      return;
    }

    if (amount <= 0) {
      setError('Der Betrag muss größer als null sein.');
      return;
    }

    const entry: EntryInput = {
      debitAccountId,
      creditAccountId,
      amount,
      date: new Date(date),
      documentNumber,
      description,
      remark,
      id: editingEntry?.id,
    };

    onSave(entry);
    resetForm();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">{editingEntry ? 'Buchungssatz bearbeiten' : 'Buchungssatz erstellen'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <SelectField
        label="Sollkonto"
        value={debitAccountId ?? ''}
        onChange={(e) => setDebitAccountId(Number(e.target.value))}
        options={accounts.map((account) => ({ value: account.id, label: account.name }))}
      />
      <SelectField
        label="Habenkonto"
        value={creditAccountId ?? ''}
        onChange={(e) => setCreditAccountId(Number(e.target.value))}
        options={accounts.map((account) => ({ value: account.id, label: account.name }))}
      />
      <InputField
        label="Betrag"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <InputField
        label="Datum"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <InputField
        label="Belegnummer"
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
      />
      <InputField
        label="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputField
        label="Anmerkung"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
      <Button onClick={handleSubmit}>
        {editingEntry ? 'Buchungssatz aktualisieren' : 'Buchungssatz erstellen'}
      </Button>
    </div>
  );
}
