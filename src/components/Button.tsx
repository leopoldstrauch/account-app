import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
