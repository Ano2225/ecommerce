'use client';

import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckOutForm from "./CheckOutForm";
import Container from "../components/Container";
import Button from "../components/Button";

const CheckOutClient = () => {
  const { cartProducts, cartTotalAmount } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentRequestSend , setPayementRequestSend] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(true);

      fetch('/api/payement', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' }, // Add a comma here
        body: JSON.stringify({
          items: cartProducts
        })
      })
      .then((res) => {
          setLoading(false);

          if (res.status === 401) {
            return router.push('/login');
          }
          
          console.log("reponse du serveur", res)
          return res.json();
        }).catch((error) => {
          setError(true);
          console.log('Error', error);
          toast.error('Something went wrong')
        })
    }
  }, [cartProducts]);

  return (
   <Container>
    {cartProducts && (
   <CheckOutForm userDepositNumber={0} userPhoneNumber={0} adminDepositNumber={0}/>
    ) }
    {!cartProducts && (
          <p className="text-red-500 text-center">Rien dans le panier</p>
    )}
    {loading && <div className="text-center"> Page de paiment in loading...</div>}
    {error && ( <div className="text-center text-rose-500"> Something went wrong... </div>)}
    {paymentRequestSend && (
     <div className="flex items-center flex-col gap-4">
       <div className="text-teal-500 text-center"> Paiement en cours , vous serez contacter une fois commande validée </div>
      <div className="max-w-[220px] w-full">
        <Button  label="Voir vos commandes" onClick={() => router.push('/order') }/>
      </div>
     </div>
    )}
  </Container>

  );
}

export default CheckOutClient;
