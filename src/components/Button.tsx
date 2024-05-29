import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Optional gemacht
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button onClick={onClick} className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
