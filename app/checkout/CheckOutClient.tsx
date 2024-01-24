import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CheckOutClient = () => {
  const { cartProducts, cartTotalAmount } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(true);

      fetch('/api/create-payment-intent', {
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

          return res.json();
        });
    }
  }, [cartProducts]);

  return (
    <div>
      checkout
    </div>
  );
}

export default CheckOutClient;
