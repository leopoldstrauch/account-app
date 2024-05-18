import EntryItem from './EntryItem';
import { Account } from '../core/types/Account';
import { Entry } from '../core/types/Entry';

type EntryListProps = {
  entries: Entry[];
  accounts: Account[];
  onEdit: (entry: Entry) => void;
  onDelete: (id: number) => void;
  onReverse: (id: number) => void;
};

export default function EntryList({ entries, accounts, onEdit, onDelete, onReverse }: EntryListProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      {entries.length === 0 ? (
        <p className="text-gray-700">Keine Buchungssätze vorhanden.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map(entry => (
            <EntryItem
              key={entry.id}
              entry={entry}
              accounts={accounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onReverse={onReverse}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
