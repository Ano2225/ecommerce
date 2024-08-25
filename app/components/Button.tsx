'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-full rounded-md transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 
        disabled:opacity-70 disabled:cursor-not-allowed 
        ${outline ? 'bg-white text-slate-700 border-slate-700' : 'bg-slate-800 text-white border-slate-800'}
        ${small ? 'text-sm font-light py-1 px-2 border-[1px]' : 'text-md font-semibold py-3 px-4 border-2'}
        ${custom ? custom : ''}`}
    >
      {Icon && <Icon size={small ? 20 : 24} />}
      {label}
    </button>
  );
};

export default Button;
