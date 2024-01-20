import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;

            if(prev){
                updateCart = [...prev, product]
            }else {
                updateCart = [product]
            }

            localStorage.setItem('eShopCartItems', JSON.stringify(updateCart))
            return updateCart;
        })
    },[])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        
    }

    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error('Usecart must be used within a CartContextProvider')
    }

    return context;
}