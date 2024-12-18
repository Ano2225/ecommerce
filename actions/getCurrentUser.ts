// @ts-nocheck


import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions);
    
}

export async function getCurrentUser() {
    const session = await getSession();

       if(!session?.user?.email) {
        return null
       }

        const currentUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
            include: { orders: true },
        });
        console.log(currentUser);

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