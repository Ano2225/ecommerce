
  import prisma from '@/libs/prismadb';
  import { NextApiRequest, NextApiResponse } from 'next';

  // Utilitaire pour générer le code de commande
function generateCode(length: number, prefix: string): string {
  const characters = 'HIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < length; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return prefix + randomPart;
}

const CODE_LENGTH = 12;
const CODE_PREFIX = 'COM';




  const handler = async (request: NextApiRequest, res: NextApiResponse) => {
    
    try {

      if (request.method === 'POST') {
        // Handle POST request
        const { items, adminDepositNumber, userDepositNumber, userPhoneNumber,address, id_user, amount, pointure } = request.body;
        const orderId = generateCode(CODE_LENGTH, CODE_PREFIX);


        try {

          const orderData = {

            amount: parseFloat(amount.replace(/\s/g,'')),
            currency: 'XOF',
            status: 'En attente',
            deliveryStatus: 'En attente',
            createDate: new Date(),
            products: items,
            address: address,
            pointure: pointure,
            adminValidation: false,
            adminDepositNumber: adminDepositNumber,
            userDepositNumber: userDepositNumber,
            userPhoneNumber: userPhoneNumber,
            orderId,
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
        } catch (error:any) {
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
