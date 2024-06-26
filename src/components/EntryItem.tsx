import Button from './Button';
import { Entry } from '../core/types/Entry';
import {AccountReadmodel} from "@/core/types/AccountReadmodel";

type EntryItemProps = {
  entry: Entry;
  accounts: AccountReadmodel[];
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
  onReverse: (id: string) => void;
};

export default function EntryItem({ entry, accounts, onEdit, onDelete, onReverse }: EntryItemProps) {
  return (
    <li className="p-4 border rounded flex justify-between items-center">
      <div>
        <p><strong>Datum:</strong> {new Date(entry.date).toISOString().split('T')[0]}</p>
        <p><strong>Belegnummer:</strong> {entry.documentNumber}</p>
        <p><strong>Beschreibung:</strong> {entry.description}</p>
        <p><strong>Sollkonto:</strong> {accounts.find(acc => acc.id === entry.debitAccountId)?.name}</p>
        <p><strong>Habenkonto:</strong> {accounts.find(acc => acc.id === entry.creditAccountId)?.name}</p>
        <p><strong>Betrag:</strong> {entry.amount}</p>
        <p><strong>Status:</strong> {entry.status}</p>
        <p><strong>Anmerkung:</strong> {entry.remark}</p>
      </div>
      <div className="flex space-x-2">
        {entry.status === 'open' ? (
          <>
            <Button onClick={() => onEdit(entry)} className="bg-yellow-600 hover:bg-yellow-700">
              Bearbeiten
            </Button>
            <Button onClick={() => onDelete(entry.id)} className="bg-red-600 hover:bg-red-700">
              Löschen
            </Button>
          </>
        ) : (
          <Button onClick={() => onReverse(entry.id)} className="bg-blue-600 hover:bg-blue-700">
            Rückbuchen
          </Button>
        )}
      </div>
    </li>
  );
}
