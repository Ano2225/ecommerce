import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

const calculateOrderAmount = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;
};

const createOrder = async (currentUser: string, items: CartProductType[], paymentIntentId: string) => {
  const total = calculateOrderAmount(items);

  const orderData = {
    user: {
      connect: { id: currentUser },
    },
    amount: total,
    currency: 'XOF',
    status: 'En attente',
    deliveryStatus: 'En attente',
    paymentIntentId: paymentIntentId,
    products: items,
  };

  return prisma.order.create({
    data: orderData,
  });
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { items, selectedPhoneNumber } = await request.json();
  const newOrder = await createOrder(currentUser, items, selectedPhoneNumber);

  return NextResponse.json(newOrder);
}

export async function validatePayment(request: Request) {
  const { paymentIntentId } = await request.json();

  const updatedOrder = await prisma.order.update({
    where: { paymentIntentId: paymentIntentId },
    data: {
      adminValidation: true,
    },
  });

  return NextResponse.json(updatedOrder);
}
