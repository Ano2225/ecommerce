"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import toast from "react-hot-toast";
import Image from "next/image";

interface CheckOutClientProps {
  currentUser: SafeUser | null;
}

type FieldForms = {
  adminDepositNumber: string;
  userDepositNumber: string;
  userPhoneNumber: string;
  address: string;
  pointure: string;
};

const CheckOutClient: React.FC<CheckOutClientProps> = ({ currentUser }) => {
  const { cartProducts, cartTotalAmount, handleClearCart } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentRequestSend, setPaymentRequestSend] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FieldForms>();

  const onSubmit: SubmitHandler<FieldForms> = async (data) => {
    try {
      setLoading(true);

      if (!currentUser) {
        console.error('Unauthorized: No current user');
        return router.push('/login');
      }

      console.log(currentUser)

      const id_user = currentUser.id;

      const requestData = {
        items: cartProducts,
        adminDepositNumber: data.adminDepositNumber,
        userDepositNumber: data.userDepositNumber,
        userPhoneNumber: data.userPhoneNumber,
        address: data.address,
        id_user: id_user,
        amount: formattedPrice,
        pointure: data.pointure,
      };

      // Envoi des données à l'API de paiement
      const response = await fetch('api/payement/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.adminValidation === false) {
        toast.success('Donnée de paiement envoyée');
        setPaymentRequestSend(true);
        handleClearCart();

        // Appel de l'API pour envoyer les emails
        const emailResponse = await fetch('/api/sendOrderEmail/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: currentUser.email,
            orderDetails: requestData,
          }),
        });

        const emailData = await emailResponse.json();
        console.log('Email response:', emailData);

        if (!emailResponse.ok) {
          throw new Error(emailData.message || 'Erreur lors de l\'envoi des emails');
        }

        setLoading(false);
      } else {
        throw new Error('Échec de la soumission du paiement');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {paymentRequestSend ? (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">
            Paiement en cours, vous serez contacté une fois la commande validée
          </div>
          <div className="max-w-[220px] w-full">
            <Button label="Voir mes commandes" onClick={() => router.push('/orders')} />
          </div>
        </div>
      ) : (
        <>
          {cartProducts && (
            <form onSubmit={handleSubmit(onSubmit)} id="payment-form" className="max-w-md mx-auto">
              <Heading title="Passez votre commande" />
              <div className="mb-4">
      <div className="text-sm text-gray-600 py-3">
        Choisissez un numéro sur lequel faire le dépôt et remplissez les champs vides !
      </div>
      <div className="flex items-center gap-2">
        <span className="text-red-800 font-semibold ">0151013593</span>
        <Image src='/wave.png'
        alt="Wave" 
        width={70}
        height={70}
        
        />
      </div>
      <div className="flex items-center gap-2 py-2">
        <span className="text-red-800 font-semibold ">0799428844</span>
        <Image
        src='/orange.png'
          alt="Orange"
          width={30}
        height={30} 
          />
      </div>
      <div className="flex items-center gap-2 py-0">
        <span className="text-red-800 font-semibold">0151013593</span>
            <Image 
            src='/moov.png'
              alt="Moov"
              width={50}
            height={50}
              />
          </div>
        </div>
            <h2 className="font-semibold mt-4 mb-2 text-lg">Informations de paiement</h2>

            <div className="py-4 text-center text-gray-800 text-xl font-bold">
              Total à payer : {formattedPrice}

            </div>
            <p className="pb-4 font-medium text-gray-600">*Livraison: 2000 F</p>
            <div>
            </div>
            <div className="mb-4">
              <label htmlFor="adminDepositNumber" className="block text-sm font-medium text-gray-800">
                Numéro sur lequel vous avez effectué le depot
              </label>
              <input
                {...register("adminDepositNumber", { required: true, maxLength:10,
                  pattern: /^[0-9]*$/, })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
              />
              {errors.adminDepositNumber && (
                <span className="text-red-500 text-sm">Ce champ est requis</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="userDepositNumber" className="block text-sm font-medium text-gray-800">
                Numéro ayant effectué le dépôt
              </label>
              <input
                {...register("userDepositNumber", { required: true,maxLength:10,
                  pattern: /^[0-9]*$/ })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
                
              />
              {errors.userDepositNumber && (
                <span className="text-red-500 text-sm">Ce champ est requis</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="userPhoneNumber" className="block text-sm font-medium text-gray-800">
                Le numéro de téléphone à contacter (si paiement validé pour la livraison)
              </label>
              <input
                {...register("userPhoneNumber", { required: true,
                   maxLength:10,
                   pattern: /^[0-9]*$/,
                   })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
              />
              {errors.userPhoneNumber && (
                <span className="text-red-500 text-sm">Ce champ est requis</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="pointure" className="block text-sm font-medium text-gray-800">
               Pointure/Taile
              </label>
              <input
                {...register("pointure", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500" placeholder="37-45/M-L-XL-XXL"
              />
              {errors.pointure && (
                <span className="text-red-500 text-sm">Ce champ est requis</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-800">
               Lieu de livraison
              </label>
              <input
                {...register("address", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">Ce champ est requis</span>
              )}
            </div>
              <Button label={loading ? 'Traitement' : 'Payer'} onClick={() => {}} />
            </form>
          )}
          {!cartProducts && (
            <p className="text-red-500 text-center">Rien dans le panier</p>
          )}
          {loading && <div className="text-center">Page de paiement en cours de chargement...</div>}
          {error && (
            <div className="text-center text-red-500">Quelque chose s'est mal passé...</div>
          )}
        </>
      )}
    </Container>
  );
};

export default CheckOutClient;
