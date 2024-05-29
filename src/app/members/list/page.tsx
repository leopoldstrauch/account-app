'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { Member } from '@/core/types/Member';

export default function MembersList() {
    const [members, setMembers] = useState<Member[]>([]);
    const [error, setError] = useState('');
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const response = await fetch('/api/members');
        const data = await response.json();
        setMembers(data);
    };

    const deleteMember = async (id: number) => {
        if (!confirm('Sind Sie sicher, dass Sie dieses Mitglied löschen möchten?')) {
            return;
        }

        await fetch(`/api/members/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetchMembers();
    };

    const handleEdit = (member: Member) => {
        setEditingMember(member);
    };

    const handleSave = async (member: Member) => {
        await fetch(`/api/members/${member.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
        });

        setEditingMember(null);
        fetchMembers();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mitglieder Übersicht</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-white p-4 rounded shadow">
                {members.length === 0 ? (
                    <p className="text-gray-700">Keine Mitglieder vorhanden. Bitte erstellen Sie ein Mitglied.</p>
                ) : (
                    <ul className="space-y-2">
                        {members.map(member => (
                            <li key={member.id} className="p-4 border rounded flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium">{member.name} {member.firstName}</h3>
                                    <p>Geburtstag: {new Date(member.birthdate).toLocaleDateString()}</p>
                                    <p>Mitglied seit: {new Date(member.membershipStartDate).toLocaleDateString()}</p>
                                    <p>{member.phoneNumber ? `Tel - Festnetz: ${member.phoneNumber}` : ''}</p>
                                    <p>{member.mobileNumber ? `Tel - Mobil: ${member.mobileNumber}` : ''}</p>
                                    <p>Email: {member.email}</p>
                                    <p>Adresse: {member.street}, {member.postalCode} {member.city}</p>
                                    <p>{member.addressAddition}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button onClick={() => handleEdit(member)} className="bg-yellow-600 hover:bg-yellow-700">
                                        Bearbeiten
                                    </Button>
                                    <Button onClick={() => deleteMember(member.id)} className="bg-red-600 hover:bg-red-700">
                                        Löschen
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {editingMember && (
                <div className="bg-white p-4 rounded shadow mt-4">
                    <h2 className="text-xl font-semibold mb-2">Mitglied bearbeiten</h2>
                    <InputField label="Name" name="name" value={editingMember.name} onChange={e => setEditingMember({ ...editingMember, name: e.target.value })} />
                    <InputField label="Vorname" name="firstName" value={editingMember.firstName} onChange={e => setEditingMember({ ...editingMember, firstName: e.target.value })} />
                    <InputField label="Geburtstag" name="birthdate" type="date" value={new Date(editingMember.birthdate).toISOString().split('T')[0]} onChange={e => setEditingMember({ ...editingMember, birthdate: new Date(e.target.value) })} />
                    <InputField label="Beginn der Mitgliedschaft" name="membershipStartDate" type="date" value={new Date(editingMember.membershipStartDate).toISOString().split('T')[0]} onChange={e => setEditingMember({ ...editingMember, membershipStartDate: new Date(e.target.value) })} />
                    <InputField label="Ende der Mitgliedschaft" name="membershipEndDate" type="date" value={editingMember.membershipEndDate ? new Date(editingMember.membershipEndDate).toISOString().split('T')[0] : ''} onChange={e => setEditingMember({ ...editingMember, membershipEndDate: e.target.value ? new Date(e.target.value) : null })} />
                    <InputField label="Tel - Festnetz" name="phoneNumber" value={editingMember.phoneNumber || ''} onChange={e => setEditingMember({ ...editingMember, phoneNumber: e.target.value })} />
                    <InputField label="Tel - Mobil" name="mobileNumber" value={editingMember.mobileNumber || ''} onChange={e => setEditingMember({ ...editingMember, mobileNumber: e.target.value })} />
                    <InputField label="Email" name="email" value={editingMember.email} onChange={e => setEditingMember({ ...editingMember, email: e.target.value })} />
                    <InputField label="PLZ / Ort" name="postalCode" value={editingMember.postalCode} onChange={e => setEditingMember({ ...editingMember, postalCode: e.target.value })} />
                    <InputField label="Stadt" name="city" value={editingMember.city} onChange={e => setEditingMember({ ...editingMember, city: e.target.value })} />
                    <InputField label="Straße" name="street" value={editingMember.street} onChange={e => setEditingMember({ ...editingMember, street: e.target.value })} />
                    <InputField label="Anschrift Zusatz" name="addressAddition" value={editingMember.addressAddition || ''} onChange={e => setEditingMember({ ...editingMember, addressAddition: e.target.value })} />
                    <Button onClick={() => handleSave(editingMember)}>Speichern</Button>
                </div>
            )}
        </div>
    );
}
