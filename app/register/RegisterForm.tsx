'use client'

import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import toast from "react-hot-toast"
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"

interface RegisterFormProps {
    currentUser : SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {

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

         const router = useRouter();

         useEffect(() => {
            if(currentUser){
                router.push('/cart');
                router.refresh();
            }
         },[]);

         const onSubmit:SubmitHandler<FieldValues> = (data) => {
            setIsloading(true);

            axios.post('/api/register', data).then(() => {
                toast.success('Compté crée avec succès ')

                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,

                }).then((callback) => {
                    if(callback?.ok) {
                        router.push("/cart")
                        router.refresh();
                        toast.success('Connecté ');
                       
                    }

                    if(callback?.error){
                        toast.error(callback.error)
                    }
                })
            }).catch(() => toast.error('Something went wrong'))
              .finally(() => {
                setIsloading(false)
            });  
         }

         if(currentUser){
            return <p className="text-center">Connecté. Redirection...</p>
         }

    return (
    <>
    <Heading title="S'inscrire sur Owen-Market"/>
    {/*<Button 
    outline
     label="S'inscrire avec Google"
     icon={AiOutlineGoogle}
     onClick={() => {signIn('google')}}
     
      />
    
    <hr className="bg-slate-300 w-full h-px"/>
      */}
    <Input id="name" 
    label="Nom" 
    disabled={isLoading}
     register={register}
      errors={errors} 
      required/>

    <Input id="email" 
    label="Email" 
    disabled={isLoading}
     register={register}
      errors={errors} 
      required
      type="text"
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
        className="underline mx-2"
        >
            Se connecter
        </Link></p>
    </>
    
  )
}

export default RegisterForm
