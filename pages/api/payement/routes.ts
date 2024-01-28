import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

const calculateOrderAmount = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;
};

const handler = async (request: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentUser = await getCurrentUser();
    let id_user: string | undefined;

    if (currentUser) {
      id_user = currentUser.id;
      console.log('UserId', id_user);
    }

    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (request.method === 'GET') {
      // Handle GET request
      return res.json({ message: 'Hello, World!' });
    }

    if (request.method === 'POST') {
      // Handle POST request
      const { items, adminDepositNumber, userDepositNumber, userPhoneNumber, address } = await request.body;

      try {
        const total = calculateOrderAmount(items);

        const orderData = {
          userId: id_user,
          amount: total,
          currency: 'XOF',
          status: 'En attente',
          deliveryStatus: 'En attente',
          createDate: new Date(),
          products: items,
          address: address,
          adminValidation: false,
          adminDepositNumber: adminDepositNumber,
          userDepositNumber: userDepositNumber,
          userPhoneNumber: userPhoneNumber,
        };

        const newOrder = await prisma.order.create({
          data: orderData,
        });

        console.log('Order created:', newOrder);

        return res.status(200).json(newOrder);
      } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Failed to create order' });
      }
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({ error: 'Failed to get current user' });
  }
};

export default handler;
