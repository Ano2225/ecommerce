'use server'


import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getSession() {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        console.error("Failed to get session:", error);
        return null;
    }
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

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
    } catch (error) {
        console.error("Failed to get current user:", error);
        return null;
    }
}