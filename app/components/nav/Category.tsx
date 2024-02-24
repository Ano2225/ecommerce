// @ts-nocheck

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({
    label,
    icon: Icon,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        if (label === 'Tous') {
            router.push('/');
        } else {
            const currentQuery = Object.fromEntries(params);
            const updatedQuery = {
                ...currentQuery,
                category: label
            };

            const url = new URL('/', window.location.origin);
            url.search = new URLSearchParams(updatedQuery).toString();

            router.push(url.pathname + url.search);
        }
    }, [label, params, router]);

    return (
        <div onClick={handleClick} className={`flex items-center justify-center text-center
            gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
            ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}`}
        >
            <Icon size={20} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
};

export default Category;
