
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
       
        try {
            const { name, price, brand, description, inStock, category, images } = req.body;

            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    brand,
                    category,
                    inStock,
                    images,
                    price: parseFloat(price)
                }
            });

            return res.status(201).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
