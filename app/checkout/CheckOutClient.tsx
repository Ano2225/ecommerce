"use client"

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface CheckOutClientProps {
  currentUser: SafeUser | null;
}

const CheckOutClient: React.FC<CheckOutClientProps> = ({ currentUser: initialUser }) => {
  const { cartProducts, cartTotalAmount } = useCart();
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentRequestSend, setPaymentRequestSend] = useState(false); // Ajout de l'état
  const formattedPrice = formatPrice(cartTotalAmount);
  const router = useRouter();

  //Permet d'utiliser les hook forms
  const { register, handleSubmit, formState: { errors } } = useForm();


  // Utiliser le useEffect pour exécuter fetchUserData lors du montage du composant
  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    }
  };

  // Fonction pour soumettre le formulaire
  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      setLoading(true);

      // Récupérer les informations de l'utilisateur
      const currentUser = await getCurrentUser();
      let id_user: string | undefined;

      if (currentUser) {
        id_user = currentUser.id;
        console.log('UserId', id_user);
      } else {
        console.error('Unauthorized: No current user');
        return router.push('/login');
      }

      // Faire la requête vers l'API de paiement
      const response = await fetch('api/payement/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          adminDepositNumber: data.adminDepositNumber,
          userDepositNumber: data.userDepositNumber,
          userPhoneNumber: data.userPhoneNumber,
          address: data.address,
          userId: id_user,
        }),
      });

      setLoading(false);

      // Gérer la réponse de l'API
      if (response.status === 401) {
        console.error('Erreur 401: Non autorisé');
        return router.push('/login');
      }

      if (currentUser) {
        const responseData = await response.json();

        if (responseData.success) {
          setPaymentRequestSend(true);
        } else {
          // Gérer d'autres cas d'erreur spécifiques si nécessaire
          throw new Error('Soumission échouée');
        }
      } else {
        console.log('No CurrentUser');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setError(true);
    }
  };


  return (
    <Container>
      {cartProducts && (
        <form onSubmit={handleSubmit(onSubmit)} id="payment-form" className="max-w-md mx-auto">
          <Heading title="Passez votre commande" />

          <div className="mb-4">
    <div className="text-sm text-gray-600 py-3">
      Choisissez un numéro sur lequel faire le dépôt et remplissez les champs vides !
    </div>
    <div className="flex items-center gap-2">
      <span className="font-medium">Numero de depot :</span>
      <span className="text-red-800 font-semibold ">+225 0102528848</span>
      <Image src='/wave.png'
       alt="Wave" 
       width={70}
       height={70}
       
       />
    </div>
    <div className="flex items-center gap-2">
      <span className="font-medium">Numero de depot :</span>
      <span className="text-red-800 font-semibold ">+225 0102528848</span>
      <Image
       src='/orange.png'
        alt="Orange"
        width={30}
       height={30} 
        />
    </div>
    <div className="flex items-center gap-2">
      <span className="font-medium">Numero de depot :</span>
      <span className="text-red-800 font-semibold">+225 0102528848</span>
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

          <div className="mb-4">
            <label htmlFor="adminDepositNumber" className="block text-sm font-medium text-gray-800">
              Numéro sur lequel vous avez effectué le depot
            </label>
            <input
              type="tel"
              {...register("adminDepositNumber", { required: true })}
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
              type="tel"
              {...register("userDepositNumber", { required: true })}
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
              type="tel"
              {...register("userPhoneNumber", { required: true })}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
            />
            {errors.userPhoneNumber && (
              <span className="text-red-500 text-sm">Ce champ est requis</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-800">
              Lieu de livraison
            </label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">Ce champ est requis</span>
            )}
          </div>

          <Button
            label={loading ? 'Traitement' : 'Payer'}
            onClick={() => {}}
          />
        </form>
      )}
      {!cartProducts && (
        <p className="text-red-500 text-center">Rien dans le panier</p>
      )}
      {loading && <div className="text-center"> Page de paiement en cours de chargement...</div>}
      {error && (<div className="text-center text-red-500"> Something went wrong... </div>)}
      {paymentRequestSend && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center"> Paiement en cours, vous serez contacté une fois la commande validée </div>
          <div className="max-w-[220px] w-full">
          </div>
        </div>
      )}
    </Container>
  );
};

export default CheckOutClient;
