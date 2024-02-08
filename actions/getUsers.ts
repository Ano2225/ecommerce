import prisma from '@/libs/prismadb';

export default async function getUsers(){
    try {
        const users = prisma?.user.findMany()
    }
    catch (error: any) {
        throw new Error
    }
}