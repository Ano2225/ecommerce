// @ts-nocheck

import getProducts from "@/actions/getProduct";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin =async () => {

  const products = await getProducts({category: null});
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData  title={"Oops ! Accès refusé "}/>
  }
   
  return (
    <div className="pt-8">
      <Container>
       <Summary products={products} orders={orders} users={users}/>
       <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph  data={graphData}/>
       </div>
      </Container>
    </div>
      
  )
}

export default Admin;
