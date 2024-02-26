// @ts-nocheck

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getCurrentUser(req) {
    const session = await getServerSession(authOptions, req);

    const userEmail = session?.user?.email;
    if (!userEmail) {
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { orders: true },
    });

    if (!currentUser) {
        return null;
    }

    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updateAt?.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
}