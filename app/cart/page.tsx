import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "./CartClient";
import { SafeUser } from "@/types";
import React, { useEffect, useState } from "react";

interface CartProps {
  currentUser: SafeUser | null;
}

const Cart: React.FC<CartProps> = () => {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Cart;
