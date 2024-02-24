// @ts-nocheck

'use client'

import { useRouter } from 'next/router';
import { categories } from "@/utils/Categories"
import Container from "../Container"
import Category from "./Category"

const Categories = () => {
    const router = useRouter();
    const category = router.query.category;
    const pathname = router.pathname;
    const isMainPage = pathname === '/'

    if(!isMainPage) return null;

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
    )
}

export default Categories