// @ts-nocheck


import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import {products} from "../utils/products"
import { truncateText } from "@/utils/truncateTexts";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProduct";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length === 0) {
    return <NullData title={"Ooops ! Pas d'article trouvés ."} />
  }

  function shuffleArray(array: any) {
    for(let i = array.length -1; i> 0; i--){
      const j = Math.floor(Math.random() *(i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const shuffledProducts = shuffleArray(products)

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
          {shuffledProducts.map((product: any) => {
            return <ProductCard key={product.id} data={product}/>
          })}
      </div>
    </Container>
   </div>
  )
}
