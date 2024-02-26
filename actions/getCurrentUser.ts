// @ts-nocheck


import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getServerSideProps(context) {
    const session = await getServerSession(authOptions, context.req);

    const userEmail = session?.user?.email;
    if (!userEmail) {
        return { props: {} };
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { orders: true },
    });

    if (!currentUser) {
        return { props: {} };
    }

    return {
        props: {
            user: {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updateAt?.toISOString(),
                emailVerified: currentUser.emailVerified?.toISOString() || null,
            }
        }
    };
}