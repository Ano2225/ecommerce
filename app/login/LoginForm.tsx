"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import Link from "next/link";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading, setIsloading] =useState(false);
    const {
        register, 
        handleSubmit,
        formState: {errors }, 
    } = useForm<FieldValues>({
        defaultValues: {
            email:"",
            password:"",
        }
    });

    const router = useRouter();

    useEffect(() => {
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    },[currentUser])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);
        signIn('credentials',{
            ...data,
            redirect: false
        }).then((callback) => {
            setIsloading(false)

            if(callback?.ok) {
                router.push("/cart")
                router.refresh();
                toast.success('Connecté ');
               
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    if(currentUser){
        return <p className="text-center">Connecté . Redirection...</p>
    }

    return ( 
        <>
        <Heading  title="Se connecter"/>
        {/*<Button  outline
        label="Continuez avec Google"
        onClick={() => {signIn('google')}}
        /> 
        <hr className="bg-slate-500 w-full h-px"/>
        */}
        <Input id="email" 
        label="Email" 
        disabled={isLoading}
        register={register}
        errors={errors} 
        required/>

        <Input id="password" 
        label="Mot de passe" 
        disabled={isLoading}
        register={register}
        errors={errors} 
        required
        type="password"
        />

        <Button
        label={isLoading? "Loading": "Se connecter"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
        />
        <p className="text-sm">Pas de compte ? 
        <Link 
        href='/register'
        className="underline mx-2"
        >
            S&apos;insrire
        </Link></p>
        </>
     );
}
 
export default LoginForm;