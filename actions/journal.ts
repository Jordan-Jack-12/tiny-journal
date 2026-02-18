"use server"

import prisma from "@/lib/prisma"

export async function getJournalPageByUserIdServerAction(userId: string) {
    try {
        const response = await prisma.journalPage.findMany({
            where: {
                userId: userId,
            }
        })
        if (!response || response.length < 1) return {
            success: false,
            message: "Something went wrong",
        }
        return {
            success: true,
            message: "Successfully fecthed data",
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}

export async function getJournalPageById(journalId: string) {
    try {
        const response = await prisma.journalPage.findFirst({
            where: {
                id: journalId
            }
        })
        if (!response) return {
            success: false,
            message: "Something went wrong"
        }
        return {
            success: true,
            message: "Successfully fetched data",
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}

export async function getJournalBlocksServerAction(journalId: string) {
    try {
        const response = await prisma.journalBlock.findMany({
            where: {
                journalId: journalId
            },
        })

        if (!response) return {
            success: false,
            message: "Something went wrong",
        }

        return {
            success: true,
            message: "Succesfully fecthed the Blocks",
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}