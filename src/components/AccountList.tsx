import AccountItem from './AccountItem';
import {AccountReadmodel} from "@/core/types/AccountReadmodel";

type AccountListProps = {
    accounts: AccountReadmodel[];
    onDelete: (id: string) => void;
};

export default function AccountList({accounts, onDelete}: AccountListProps) {
    return (
        <div className="bg-white p-4 rounded shadow">
            {accounts.length === 0 ? (
                <p className="text-gray-700">Keine Konten vorhanden. Bitte erstellen Sie ein Konto.</p>
            ) : (
                <ul className="space-y-2">
                    {accounts.map(account => (
                        <AccountItem key={account.id} account={account} onDelete={onDelete}/>
                    ))}
                </ul>
            )}
        </div>
    );
}
