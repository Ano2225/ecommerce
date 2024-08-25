"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { truncateText } from "@/utils/truncateTexts";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

// Types pour les props
interface Review {
  rating: number;
}

interface ImageData {
  image: string;
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  reviews: Review[];
  images: ImageData[];
}

interface ProductCardProps {
  data: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating = useMemo(() => {
    if (data.reviews.length === 0) return 0;
    const totalRating = data.reviews.reduce((acc, item) => acc + item.rating, 0);
    return totalRating / data.reviews.length;
  }, [data.reviews]);

  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="col-span-1 cursor-pointer border border-slate-200 bg-slate-50 rounded-sm p-2 transition-transform transform hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-2">
        {/* Image du produit */}
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={data.images[0]?.image || "/noimage.jpg"}
            alt={data.name}
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Titre du produit */}
        <div className="mt-4 font-semibold text-gray-800">{truncateText(data.name)}</div>

        {/* Évaluation du produit */}
        <div className="flex items-center justify-center gap-1">
          <Rating value={productRating} precision={0.5} readOnly />
          <span>({data.reviews.length} avis)</span>
        </div>

        {/* Prix du produit */}
        <div className="font-bold text-lg text-gray-900">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
