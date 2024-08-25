// @ts-nocheck

import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getProductById from "@/actions/getProductById";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product)
    return <NullData title="Oops ! Le produit n'existe pas " />;

  const userHasOrderedProduct = user?.orders.some((order) =>
    order.products.find((item) => item.id === product.id)
  );

  const userReview = product?.reviews.find((review) => review.userId === user?.id);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <h2 className="text-2xl font-bold">Avis des utilisateurs</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ListRating product={product} />
          ) : (
            <p className="text-gray-500">Aucun avis pour ce produit.</p>
          )}
          {!userReview && userHasOrderedProduct && (
            <div>
              <h3 className="text-xl font-semibold">Ajouter une note</h3>
              <AddRating product={product} user={user} />
            </div>
          )}
          {!userHasOrderedProduct && (
            <p className="text-gray-500">
              Vous devez commander ce produit avant de pouvoir le noter.
            </p>
          )}
          {userReview && (
            <p className="text-gray-500">Vous avez déjà noté ce produit.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Product;
