  "use client"

  import { useCart } from "@/hooks/useCart";
  import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";
  import { useForm , SubmitHandler } from "react-hook-form";
  import Container from "../components/Container";
  import Heading from "../components/Heading";
  import Button from "../components/Button";
  import Image from "next/image";
  import { formatPrice } from "@/utils/formatPrice";
  import { SafeUser } from "@/types";
  

  interface CheckOutClientProps {
    currentUser: SafeUser | null;
  }

  type FieldForms = {
    adminDepositNumber:string;
    userDepositNumber: string;
    userPhoneNumber: string;
    address:string

  }

  const CheckOutClient: React.FC<CheckOutClientProps> = ({ currentUser }) => {
    const { cartProducts, cartTotalAmount } = useCart();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentRequestSend, setPaymentRequestSend] = useState(false); // Ajout de l'état
    const formattedPrice = formatPrice(cartTotalAmount);
    const router = useRouter();

    //Permet d'utiliser les hook forms
    const { register, handleSubmit, formState: { errors } } = useForm<FieldForms>();


    // Fonction pour soumettre le formulaire
    const onSubmit: SubmitHandler<FieldForms> = async (data) => {
      console.log(data);
      console.log(cartProducts)

      try {
        setLoading(true);


        if (!currentUser) {
          console.error('Unauthorized: No current user');
          return router.push('/login');
        }
        // Récupérer l'ID de l'utilisateur connecté
        const id_user = currentUser.id;
        console.log('UserId', id_user);

        

        //Preparer les donnees à envoyer à l'API
        const requestData = {
          items: cartProducts,
          adminDepositNumber: data.adminDepositNumber,
          userDepositNumber: data.userDepositNumber,
          userPhoneNumber: data.userPhoneNumber,
          address: data.address,
          id_user: id_user,
          amount: formattedPrice

        };


        //Envoi des donnees à l'API
        const response = await fetch('api/payement/routes',{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(requestData) 

          });

          const responseData = await response.json();
          console.log(responseData)

          if(responseData) {
            setPaymentRequestSend(true);
          }else {
            throw new Error('Failed to submit payment')
          }

       } catch (error) {
        console.error('Erreur lors de la soumission :', error);
        setError(true);
      }finally {
        setLoading(false);
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
            <div>
            </div>
            <div className="mb-4">
              <label htmlFor="adminDepositNumber" className="block text-sm font-medium text-gray-800">
                Numéro sur lequel vous avez effectué le depot
              </label>
              <input
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
