interface IPrams {
    productId?: string
}

import Container from "@/app/Container"
import { product } from "@/utils/product"
import ProductDetails from "./ProductDetails"


const Product = ({params} : {params: IPrams}) => {
    console.log("params :", params)
  return (
    <div>
     <Container>
            <ProductDetails product = {product}/>
     </Container>
    </div>
  )
}

export default Product;
