import React from 'react';

interface InputFieldProps {
  label: string;
  name: string; // Name hinzugefügt
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name, // Name hinzugefügt
  type = 'text',
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name} // Name hinzugefügt
      type={type}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default InputField;
