'use client'

import { useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"

const RegisterForm = () => {

    const [isLoading, setIsloading] = useState(false);
    const {register,
         handleSubmit, 
         formState: {errors}, } = useForm<FieldValues>({
            defaultValues: {
                name: "",
                email: "",
                password: ""
            }
         });

         const onSubmit:SubmitHandler<FieldValues> = (data) => {
            setIsloading(true);
            console.log(data);
         }

    return (
    <>
    <Heading title="S'inscrire sur Owen-Market"/>
    <Button 
    outline
     label="S'inscrire avec Google"
     icon={AiOutlineGoogle}
     onClick={() => {}}
     
      />
    <hr className="bg-slate-300 w-full h-px"/>
    <Input id="name" 
    label="Nom" 
    disabled={isLoading}
     register={register}
      errors={errors} 
      required/>

    <Input id="email" 
    label="E-mail" 
    disabled={isLoading}
     register={register}
      errors={errors} 
      required
      type="email"
      />

    <Input id="password" 
    label="Mot de passe" 
    disabled={isLoading}
     register={register}
      errors={errors} 
      required
      type="password"
      />

      <Button
        label={isLoading? "Loading": "S'inscrire"}
        onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm">Déjà un compte ? 
        <Link 
        href='/login'
        className="underline"
        >
            Se connecter
        </Link></p>
    </>
    
  )
}

export default RegisterForm
