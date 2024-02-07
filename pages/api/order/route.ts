import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            const { id, paymentStatus, deliveryStatus } = req.body;

            const orderPaymentValidate = await prisma.order.update({
                where: { id: id },
                data: { status: paymentStatus },
            });

            // Effectuer la deuxième requête PUT
            const orderDeliverValidate = await prisma.order.update({
                where: { id: id },
                data: { deliveryStatus: deliveryStatus },
            });

            // Répondre avec les résultats des deux requêtes PUT
            return res.status(200).json({ orderPaymentValidate, orderDeliverValidate });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internet Server Error' });
        }
    }
}
