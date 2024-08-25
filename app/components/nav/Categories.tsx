// @ts-nocheck
'use client'

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === "/";
    if (!isMainPage) return null;

    return (
        <div className="bg-white shadow-sm border-b">
            <Container>
                <div className="pt-4 pb-4 flex items-center justify-start gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                    {categories.map((item) => (
                        <Category
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label || (category === null && item.label === "Tous")}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Categories;
