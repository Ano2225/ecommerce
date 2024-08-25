'use client';

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full h-32 p-4 bg-white border-2 rounded-lg resize-none outline-none text-sm font-light transition
          ${errors[id] ? 'border-rose-400 focus:border-rose-400' : 'border-slate-300 focus:border-indigo-500'}
          disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm left-4 top-4 text-slate-400 transform transition-transform duration-150 z-10 origin-0 
          peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-slate-400'}`}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-rose-500 text-xs mt-1">{"Ce champ est requis"}</p>
      )}
    </div>
  );
};

export default TextArea;
