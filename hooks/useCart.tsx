import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";



type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease : (product: CartProductType) => void;
    handleCartQtyDecrease : (product: CartProductType) => void;
    handleClearCart : () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);


    const [cartTotalAmount, setCartTotalAmount] = useState(0);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)


        setCartProducts(cProducts);

    }, []);


   

    useEffect(() => {
        const getTotals = () => {
          if (cartProducts){
            const {total, qty} =  cartProducts?.reduce((acc, item) => {
                const itemTotal = item.price * item.quantity

                acc.total += itemTotal
                acc.qty += item.quantity

                return acc;
            }, {
                total: 0,
                qty: 0
            });

            setCartTotalQty(qty)
            setCartTotalAmount(total)
          }
        };

        getTotals();
    }, [cartProducts])

    const isToastDisplayed = useRef(false);
    const isToastDisplayedRemove = useRef(false);

   const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;

            if (prev) {
                updateCart = [...prev, product];
            } else {
                updateCart = [product];
            }

            if (!isToastDisplayed.current) {
                toast.success('Article ajouté dans le panier ');
                isToastDisplayed.current = true;
            }



            localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
            return updateCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts);
            
            if (!isToastDisplayedRemove.current) {
                toast.success('Article supprimé  ');
                isToastDisplayedRemove.current = true;
                isToastDisplayed.current = false;

            }
            isToastDisplayedRemove.current = false;

            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product:CartProductType) => {
        let updateCart;

        if(product.quantity === 99) {
            return toast.error('Ooops ! Maximum reached')
        }

        if(cartProducts) {
            updateCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) =>  item.id === product.id);

            if(existingIndex > -1) {
                updateCart[existingIndex].quantity = ++ updateCart[existingIndex].quantity
            }

            setCartProducts(updateCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product:CartProductType) => {
        let updateCart;

        if(product.quantity === 1) {
            return toast.error('Ooops ! Maximum reached')
        }

        if(cartProducts) {
            updateCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) =>  item.id === product.id);

            if(existingIndex > -1) {
                updateCart[existingIndex].quantity = -- updateCart[existingIndex].quantity
            }

            setCartProducts(updateCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
        }
    }, [cartProducts])

   
    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0)

        localStorage.setItem('eShopCartItems', JSON.stringify(null))
    },[])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
        
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