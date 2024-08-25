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
        const currentQuery = queryString.parse(params?.toString() || "");

        const page = 1;
        const limit = currentQuery.limit || 12;

        if (label === "Tous") {
            const { category, ...rest } = currentQuery;
            return { ...rest, page, limit };
        }

        return { ...currentQuery, category: label, page, limit };
    }, [label, params]);

    const handleClick = useCallback(() => {
        const url = queryString.stringifyUrl({
            url: "/",
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
