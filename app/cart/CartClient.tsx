"use client";

import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface CartClientProps{
    currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {

    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();
    const router = useRouter();


    if(!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Votre panier est vide</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack/>
                        <span>Commencez vos courses en ligne !</span>
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div>
      <Heading title="Mon Panier" center />
      <div className="grid
       grid-cols-5
       text-xs
       gap-4
       pb-2
       items-center
       mt-8
       ">
        <div className="col-span-2 justify-self-start">Article</div>
        <div className="justify-self-center">Prix</div>
        <div className="justify-self-center">Quantité</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts && cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item}/>
        })}
      </div>
      <div className="border-t-[1.5px]
       border-slate-200 
       py-4
       flex
       justify-between
       gap-4
       ">
        <div className="w-[90px]">
            <Button label="Vider"
            onClick={() => {handleClearCart()}}
            small outline
            />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
            <div className="flex justify-between text-base w-full font-semibold">
                <span>Total</span>
                <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-slate-500">Taxes et frais d&apos;expédition calculés à la caisse</p>
            <Button label={currentUser ? "Payer":"Connectez vous et payer"} 
            onClick={() => { currentUser ? router.push('/checkout') : router.push('/login') }}
            outline={currentUser ? false : true }
            />
            <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                <MdArrowBack />
                <span>Continuez vos courses</span>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default CartClient
