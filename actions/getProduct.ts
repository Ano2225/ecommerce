import prisma from '@/libs/prismadb';

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
    page?: number;
    limit?: number;
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm, page = 1, limit = 12 } = params;
        const searchString = searchTerm || '';

        const query: any = {};

        if (category) {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                reviews: {
                    include: {
                        user: true,
                    },
                },
            },
            skip,
            take: limit,
        });

        const totalProducts = await prisma.product.count({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });

        return {
            products,
            totalProducts,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
