"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 pb-2 bg-white rounded-lg outline-none transition border-2 text-sm focus:ring-0
          ${errors[id] ? "border-rose-400 focus:border-rose-400" : "border-slate-300 focus:border-indigo-500"} 
          disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm left-4 top-4 text-slate-400 transform transition-transform duration-150 z-10 origin-0 
          peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 
          ${errors[id] ? "text-rose-500" : "text-slate-400"}`}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-rose-500 text-xs mt-1">{"Ce champ est requis"}</p>
      )}
    </div>
  );
};

export default Input;
