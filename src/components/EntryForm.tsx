import InputField from './InputField';
import SelectField from './SelectField';
import Button from './Button';
import React, {useState} from 'react';
import {AccountReadmodel} from "@/core/types/AccountReadmodel";
import {CreateEntryCommand} from "@/core/usecases/entry/EntryCommands";

interface EntryFormProps {
    accounts: AccountReadmodel[];
    editingEntry: CreateEntryCommand | null;
    onSave: (entry: CreateEntryCommand) => void;
    error: string;
    setError: (error: string) => void;
}

export default function EntryForm({accounts, editingEntry, onSave, error, setError}: EntryFormProps) {
    const [formData, setFormData] = useState<CreateEntryCommand>({
        debitAccountId: editingEntry?.debitAccountId ?? '0',
        creditAccountId: editingEntry?.creditAccountId ?? '0',
        amount: editingEntry?.amount ?? 0,
        date: editingEntry?.date ?? new Date(),
        entryNumber: editingEntry?.entryNumber ?? '',
        description: editingEntry?.description ?? '',
        note: editingEntry?.note ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
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
                value={String(formData.debitAccountId)}
                onChange={handleChange}
                options={accounts.map(account => ({value: account.id, label: account.name}))}
            />
            <SelectField
                label="Habenkonto"
                name="creditAccountId"
                value={String(formData.creditAccountId)}
                onChange={handleChange}
                options={accounts.map(account => ({value: account.id, label: account.name}))}
            />
            <InputField
                label="Betrag"
                type="number"
                name="amount"
                value={String(formData.amount)}
                onChange={handleChange}
            />
            <InputField
                label="Datum"
                type="date"
                name="date"
                value={formData.date.toISOString().split('T')[0]}
                onChange={handleChange}
            />
            <InputField
                label="Belegnummer"
                name="entryNumber"
                value={formData.entryNumber}
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
                name="note"
                value={formData.note || ''}
                onChange={handleChange}
            />
            <Button type="submit" onClick={() => {
            }}>
                {editingEntry ? 'Buchungssatz aktualisieren' : 'Buchungssatz erstellen'}
            </Button>
        </form>
    );
}