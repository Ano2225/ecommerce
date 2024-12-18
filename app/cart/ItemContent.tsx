import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateTexts";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {

    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            {/* Colonne pour l'image */}
            <div className="md:col-span-2 justify-self-start flex flex-col md:flex-row gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-full md:w-[70px] h-[70px] md:h-auto aspect-square">
                        <Image
                            src={item.selectedImg.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
                    <div>{item.selectedImg.color}</div>
                    <button className="text-slate-500 underline md:w-[70px]" onClick={() => { handleRemoveProductFromCart(item) }}>
                        Effacer
                    </button>
                </div>
            </div>

            {/* Colonne pour le prix unitaire */}
            <div className="justify-self-center">{formatPrice(item.price)}</div>

            {/* Colonne pour la quantité */}
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={() => handleCartQtyIncrease(item)}
                    handleQtyDecrease={() => handleCartQtyDecrease(item)}
                />
            </div>

            {/* Colonne pour le prix total */}
            <div className="justify-self-end font-semibold">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
};

export default ItemContent;
