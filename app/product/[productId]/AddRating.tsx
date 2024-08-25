'use client';

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from '@prisma/client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & { reviews: Review[] };
  user: (SafeUser & { orders: Order[] }) | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error('Veuillez sélectionner une note.');
    }

    const ratingData = { ...data, userId: user?.id, productId: product.id };

    try {
      await axios.post('/api/rating/route', ratingData);
      toast.success('Note soumise avec succès');
      router.refresh();
      reset();
    } catch (error) {
      console.error('Erreur lors de la soumission de la note:', error);
      toast.error('Quelque chose s\'est mal passé.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !product) return null;

  // Vérification si l'utilisateur a déjà laissé un avis ou si la commande a été livrée
  const deliveredOrder = user?.orders.some(order =>
    order.products.find(item => item.id === product.id) && order.deliveryStatus === "Livré"
  );

  const userReview = product?.reviews.find((review: Review) => review.userId === user.id);

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-4 max-w-[500px]">
      <Heading title="Notez cet article" />
      <Rating
        name="rating"
        onChange={(event, newValue) => {
          setValue('rating', newValue || 0, { shouldValidate: true });
        }}
        disabled={isLoading}
      />
      <Input
        id="comment"
        label="Laissez un commentaire"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? 'En cours...' : 'Noter cet article'}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddRating;
