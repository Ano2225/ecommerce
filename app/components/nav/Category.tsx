// @ts-nocheck
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useMemo } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
    const router = useRouter();
    const params = useSearchParams();

    const updatedQuery = useMemo(() => {
        if (!params) return {};

        const currentQuery = queryString.parse(params.toString());

        if (label === "Tous") {
            return {};
        }

        return { ...currentQuery, category: label };
    }, [label, params]);

    const handleClick = useCallback(() => {
        const url = queryString.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [updatedQuery, router]);

    return (
        <div
            onClick={handleClick}
            className={`flex items-center justify-center text-center
            gap-2 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
            ${selected ? "border-b-slate-800 text-slate-800" : "border-transparent text-slate-500"}`}
        >
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
        </div>
    );
};

export default Category;
