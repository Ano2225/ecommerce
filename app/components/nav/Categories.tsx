// @ts-nocheck
'use client'

import { categories } from "@/utils/Categories"
import Container from "../Container"
import Category from "./Category"
import { useEffect, useState } from 'react'; // Importer useEffect et useState depuis React

const Categories = () => {
    const [category, setCategory] = useState(null); // Utiliser useState pour stocker la valeur de category
    const [isMainPage, setIsMainPage] = useState(false); // Utiliser useState pour stocker la valeur de isMainPage

    useEffect(() => {
        // Vérifier si c'est la page principale
        setIsMainPage(window.location.pathname === '/');
        
        // Récupérer le paramètre 'category' de l'URL
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');
        setCategory(categoryParam);
    }, []); // Exécuter cet effet une seule fois après le premier rendu

    if (!isMainPage) return null;

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categories.map((item) => (
                        <Category 
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label || (category === null && item.label ==="Tous")}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Categories;
