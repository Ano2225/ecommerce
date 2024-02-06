import { MdStorefront, MdShoppingBasket, MdWatch, MdLocalOffer, MdLocalMall } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GiClothes } from "react-icons/gi";

export const categories = [
    {
        label: 'Tous',
        icon: MdStorefront
    },
    {
        label: 'Habits',
        icon: MdLocalOffer
    },
    {
        label: 'Chaussures',
        icon: MdLocalMall
    },
    {
        label: 'Montres',
        icon: MdWatch
    },
    {
        label: 'Pantalons',
        icon: GiClothes
    },
    {
        label: 'Autres',
        icon: MdOutlineAddShoppingCart
    },
];
