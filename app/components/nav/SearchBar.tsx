'use client'

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import queryString from 'query-string';
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push('/');

    setIsSubmitting(true);

    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        searchTerm: data.searchTerm
      }
    }, {
      skipNull: true
    });

    router.push(url);
    reset();
    setIsSubmitting(false); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <div className="relative w-full">
        <input 
          {...register('searchTerm', { required: "Le champ de recherche ne peut pas être vide" })}
          autoComplete="off"
          type="text"
          aria-label="Champ de recherche"
          placeholder="Chercher un produit, une marque"
          className={`p-2 border w-80 rounded-l-md focus:outline-none
          ${errors.searchTerm ? 'border-red-500' : 'border-gray-300 focus:border-slate-500'}`}
        />
      </div>
      <button 
        type="submit"
        className={`bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md transition-all duration-150
        ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isSubmitting} 
      >
        {isSubmitting ? 'Recherche...' : 'Rechercher'}
      </button>
    </form>
  );
}

export default SearchBar;
