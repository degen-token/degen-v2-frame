import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonPrimary({
  onClick,
  children,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'bg-violet-500 px-3.5 py-2.5 font-semibold text-slate-900 shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
        className
      )}
    >
      {children}
    </button>
  );
}
