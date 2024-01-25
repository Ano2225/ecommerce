import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

const calculateOrderAmount = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;
};

const createOrder = async (currentUser: string, items: CartProductType[], paymentIntentId: string) => {
  try {
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

    const newOrder = await prisma.order.create({
      data: orderData,
    });

    console.log('Order created:', newOrder);

    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};


export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { items, selectedPhoneNumber } = await request.json();

  if (!items || !Array.isArray(items) || items.length === 0 || !selectedPhoneNumber) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const newOrder = await createOrder(currentUser, items, selectedPhoneNumber);
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function validatePayment(request: Request) {
  const { paymentIntentId } = await request.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { paymentIntentId: paymentIntentId },
      data: {
        adminValidation: true,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error validating payment:', error);
    return NextResponse.json({ error: 'Failed to validate payment' }, { status: 500 });
  }
}
