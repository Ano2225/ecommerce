import { getCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const currentUser = await getCurrentUser(); // Récupérer l'utilisateur actuel
            
            const { comment, rating, product, userId } = req.body;

            /*// Vérifier si la commande a été livrée et si l'utilisateur a déjà soumis une critique
            const deliveredOrder = currentUser?.orders.some(order =>
                order.products.find(item => item.id === product.id) && order.deliveryStatus === "Livré"
            );

            const userReview = product.reviews.find((review: any) => review.userId === currentUser?.id);
*/
         

            // Créer une nouvelle critique
            const newReview = await prisma.review.create({
                data: {
                    comment,
                    rating,
                    productId: product.id,
                    userId
                }
            });

            return res.status(201).json(newReview);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
