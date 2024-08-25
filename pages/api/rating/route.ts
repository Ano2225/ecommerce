import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session || !session.user) {
                return res.status(401).json({ error: 'Non autorisé' });
            }

            const { comment, rating, productId, userId } = req.body;

            if (!comment || typeof rating !== 'number' || !productId) {
                return res.status(400).json({ error: 'Données invalides' });
            }

            // Créer une nouvelle critique
            const newReview = await prisma.review.create({
                data: {
                    comment,
                    rating,
                    productId,
                    userId, 
                },
            });

            return res.status(201).json(newReview);
        } catch (error) {
            console.error('Erreur lors de la soumission de la critique :', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    } else {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
