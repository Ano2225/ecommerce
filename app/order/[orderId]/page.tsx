import Container from "@/app/components/Container"
import Orderdetails from "./Orderdetails"
import getOrderById from "@/actions/getOrderById"
import NullData from "@/app/components/NullData"

interface IPrams {
    orderId?: string
}

const Order = async ({params} : {params: IPrams}) => {
    const order = await getOrderById(params);

    if(!order) {
        return <NullData title="Pas de commande"></NullData>
    }

  return (
    <div className="p-8">
     <Container>
        <Orderdetails order = {order}/> 
     </Container>
    </div>
  )
}

export default Order;
