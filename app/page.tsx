import Container from "./Container";
import HomeBanner from "./HomeBanner";
import {products} from "../utils/products"
import { truncateText } from "@/utils/truncateTexts";
import ProductCard from "./components/products/ProductCard";


export default function Home() {
  return (
   <div>
    <Container>
      <div className="p-8">
        <HomeBanner/>
      </div>
      <div className="grid grid-cols-2 
      sm:grid-cols-3 
      lg:grid:cols:4
       xl:grid-cols-5 
       2xl:grid-cols-6
        gap-8">
          {products.map((product: any) => {
            return <ProductCard key={product.id} data={product}/>
          })}
      </div>
    </Container>
   </div>
  )
}
