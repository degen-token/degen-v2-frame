import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-violet-500 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
