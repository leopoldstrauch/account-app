import { Account } from '@/core/types/Account';
import Button from './Button';

type AccountItemProps = {
  account: Account;
  onDelete: (id: string) => void;
};

export default function AccountItem({ account, onDelete }: AccountItemProps) {
  return (
    <li key={account.id} className="p-4 border rounded flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">{account.name}</h3>
        <p>Typ: {account.type}</p>
        <p>Soll: {account.debit}</p>
        <p>Haben: {account.credit}</p>
      </div>
      <Button onClick={() => onDelete(account.id)} className="bg-red-600 hover:bg-red-700">
        Löschen
      </Button>
    </li>
  );
}
