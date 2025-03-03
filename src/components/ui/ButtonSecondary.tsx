import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonSecondary({
  onClick,
  children,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-violet-slate-900 border border-violet-500 px-3.5 py-2.5 font-semibold text-neutral-50 shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${className}`}
    >
      {children}
    </button>
  );
}
