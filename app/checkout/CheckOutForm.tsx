import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Image from "next/image";

interface CheckOutFormProps {
  userDepositNumber: number;
  userPhoneNumber: number;
  adminDepositNumber: number; // Nouveau champ pour les numéros d'administration
}

const CheckOutForm: React.FC<CheckOutFormProps> = ({
  userDepositNumber,
  userPhoneNumber,
  adminDepositNumber,
}) => {
  const { cartTotalAmount, handleClearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  // Utilisation de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOutFormProps>();

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit: SubmitHandler<CheckOutFormProps> = (data) => {
    
    setIsLoading(true); // Mettez à jour l'état de chargement pendant la soumission
    // Effectuez votre logique asynchrone ici, puis mettez à jour l'état isLoading en conséquence
    // ...

    // Exemple asynchrone (simulé)
    setTimeout(() => {
      setIsLoading(false);
      // Après la logique de paiement, vous pouvez effectuer une action comme vider le panier
      handleClearCart();
    }, 2000);
  };

  useEffect(() => {
    // Vous pouvez effectuer des opérations au montage du composant si nécessaire
  }, []);

  return (
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
    {/* Répétez le modèle pour les autres numéros de dépôt */}
  </div>
  <h2 className="font-semibold mt-4 mb-2 text-lg">Informations de paiement</h2>
  {/* Le formulaire */}
  <div className="py-4 text-center text-gray-800 text-xl font-bold">
    Total à payer : {formattedPrice}
  </div>

  {/* Champ adminDepositNumbers (pour les numéros de dépôt de l'administration) */}
  <div className="mb-4">
    <label htmlFor="adminDepositNumber" className="block text-sm font-medium text-gray-800">
      Numéro sur lequel vous avez effectué le depot
    </label>
    <input
      type="tel"
      pattern="[0-9]{10}"
      {...register("adminDepositNumber", { required: true })}
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
    />
    {errors.adminDepositNumber && (
      <span className="text-red-500 text-sm">Ce champ est requis</span>
    )}
  </div>

  {/* Champ userDepositNumber */}
  <div className="mb-4">
    <label htmlFor="userDepositNumber" className="block text-sm font-medium text-gray-800">
      Numéro ayant effectué le dépôt
    </label>
    <input
      type="tel"
      pattern="[0-9]{10}"
      {...register("userDepositNumber", { required: true })}
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
    />
    {errors.userDepositNumber && (
      <span className="text-red-500 text-sm">Ce champ est requis</span>
    )}
  </div>

  {/* Champ userPhoneNumber */}
  <div className="mb-4">
    <label htmlFor="userPhoneNumber" className="block text-sm font-medium text-gray-800">
      Le numéro de téléphone à contacter (si paiement validé pour la livraison)
    </label>
    <input
      type="tel"
      pattern="[0-9]{10}"
      {...register("userPhoneNumber", { required: true })}
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-teal-500"
    />
    {errors.userPhoneNumber && (
      <span className="text-red-500 text-sm">Ce champ est requis</span>
    )}
  </div>

  <Button
    label={isLoading ? 'Traitement' : 'Payer'}
    onClick={() => {}}
  />
</form>

  );
};

export default CheckOutForm;
