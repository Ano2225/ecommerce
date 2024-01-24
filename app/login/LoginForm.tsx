"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import Link from "next/link";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";



const LoginForm = () => {

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

    return ( 
        <>
        <Heading  title="Se connecter"/>
        <Button  outline
        label="Continuez avec Google"
        onClick={() => {}}
        />
        <hr className="bg-slate-300 w-full h-px"/>
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
        />
        <p className="text-sm">Pas de compte ? 
        <Link 
        href='/register'
        className="underline"
        >
            S&apos;insrire
        </Link></p>
        </>
     );
}
 
export default LoginForm;