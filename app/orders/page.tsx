import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title={"Oops ! Accès refusé"} />;
  }

  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders || orders.length === 0) {
    return <NullData title="Pas de commande..." />;
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-b from-gray-100 to-gray-200">
      <Container>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Mes Commandes
          </h1>
          <OrdersClient orders={orders} />
        </div>
      </Container>
    </div>
  );
};

export default Orders;
