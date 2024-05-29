'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';

export default function CreateMemberPage() {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    birthdate: '',
    membershipStartDate: '',
    membershipEndDate: '',
    phoneNumber: '',
    mobileNumber: '',
    email: '',
    postalCode: '',
    city: '',
    street: '',
    addressAddition: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createMember = async () => {
    setError('');

    const res = await fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({
        name: '',
        firstName: '',
        birthdate: '',
        membershipStartDate: '',
        membershipEndDate: '',
        phoneNumber: '',
        mobileNumber: '',
        email: '',
        postalCode: '',
        city: '',
        street: '',
        addressAddition: '',
      });
    } else {
      setError('Fehler beim Erstellen des Mitglieds.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mitglied erstellen</h1>
      {error && <p className="text-red-500">{error}</p>}
      <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <InputField label="Vorname" name="firstName" value={formData.firstName} onChange={handleChange} />
      <InputField label="Geburtstag" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} />
      <InputField label="Beginn der Mitgliedschaft" name="membershipStartDate" type="date" value={formData.membershipStartDate} onChange={handleChange} />
      <InputField label="Ende der Mitgliedschaft" name="membershipEndDate" type="date" value={formData.membershipEndDate} onChange={handleChange} />
      <InputField label="Tel - Festnetz" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      <InputField label="Tel - Mobil" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
      <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
      <InputField label="PLZ / Ort" name="postalCode" value={formData.postalCode} onChange={handleChange} />
      <InputField label="Stadt" name="city" value={formData.city} onChange={handleChange} />
      <InputField label="Straße" name="street" value={formData.street} onChange={handleChange} />
      <InputField label="Anschrift Zusatz" name="addressAddition" value={formData.addressAddition} onChange={handleChange} />
      <Button onClick={createMember}>Mitglied erstellen</Button>
    </div>
  );
}
