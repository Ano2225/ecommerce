'use client';

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg:selectedImgType,
    quantity: number,
    price: number
}


export type selectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = ()=> {
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {

    const {handleAddProductToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    const [CartProduct, setCartProduct] = 
    useState<CartProductType>({
        id: product.id,
        name:product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg:{...product.images[0]},
        quantity: 1,
        price: product.price
    });

    console.log(cartProducts)

    const router = useRouter();

    //Declaration de UseEffect pour eviter de dupliquer le contenu ajouté au panier
    useEffect(() => {
        setIsProductInCart(false);

        if(cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts])

    const productRating =
    product.reviews.reduce((acc: number,item:any) => 
   item.rating + acc, 0) / product.reviews.length;

    const handleColorSelect = useCallback((value:
         selectedImgType) => {
            setCartProduct((prev)=> {
                return {...prev, selectedImg: value}
            })
         }, [CartProduct.selectedImg]);

    const handleQtyIncrease = useCallback(() => {
        if(CartProduct.quantity === 99) {
            return;
        }
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity + 1};
        });
    }, [CartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if(CartProduct.quantity === 1) {
            return;
        }
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity - 1};
        });
    }, [CartProduct]);


  return (
    <div 
    className="grid 
    grid-cols-1 
    md:grid-cols-2 
    gap-12">
        <ProductImage CardProduct={CartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-1 
        text-slate-500 text-sm">
            <h2 className="text-3xl
             font-medium
             text-slate-700
             ">{product.name}</h2>
             <div className="flex items-center gap-2">
                <Rating value={productRating} readOnly/>
                <div>{product.reviews.length} Avis</div>
             </div>
             <Horizontal/>
             <div className="text-justify">{product.description}</div>
             <Horizontal/>
             <div>
                <span className="font-semibold">Categorie:</span>{product.category}
             </div>
             <div>
                <span className="font-semibold">Marque:</span>{product.brand}
             </div>
             <div className={product.inStock ? "text-teal-400": "text-rose-400"}>{product.inStock ? "En stock":"Non disponible"}</div>
             <Horizontal/>
             {isProductInCart ?(
             <>
                <p className="mb-2 text-slate-500 flex items-center gap-1">
                    <MdCheckCircle className="text-teal-400" size={20}/>
                    <span>Articlé ajouté au panier </span>
                </p>
                <div className="max-w-[300px]">
                    <Button
                     label="Voir panier"
                     outline
                     onClick={() => {router.push('/cart')}}
                     />
                </div>
             </> ):( <>
                <SetColor
                cartProduct={CartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}

                />
                <Horizontal/>
                <SetQuantity 
                cartProduct={CartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
                />
                <Horizontal/>
                <div className="max-w-[300px]">
                    <Button
                    label="Ajouter au panier"
                    onClick={() => handleAddProductToCart(CartProduct)}
                    />
                </div>
             </>
             )}
            

        </div>
    </div>
  )
}

export default ProductDetails
