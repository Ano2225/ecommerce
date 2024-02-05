"use server"

import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';



const handler = async (request: NextApiRequest, res: NextApiResponse) => {
  try {

    if (request.method === 'POST') {
      // Handle POST request
      const {items, adminDepositNumber, userDepositNumber, userPhoneNumber, address, id_user, amount } = request.body;

      try {


        const orderData = {
          amount: amount,
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
          user: {
            connect: {
              id: id_user,
            }
          }
        };

        const newOrder = await prisma.order.create({
          data: orderData,
        });

        console.log('Order created:', newOrder);

        return res.status(200).json(newOrder);
      } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: `Failed to create order: ${error.message}` });

      }
    } else {
      return res.status(400).json({ error: 'Bad Request' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
