import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const product = await prisma.product.delete({
                where: { id: id?.toString() }
            });

            return res.status(200).json(product);
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
