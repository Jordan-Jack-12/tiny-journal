"use server"

import prisma from "@/lib/prisma"
import { JournalBlockType, JsonObjType } from "@/types/journals.types";
import { getLoggedInUserProfileId } from "./session";

export async function updateJournalTitleById({ journalId, title }: { journalId: string, title: string }) {

    try {
        const res = await prisma.journal_page.update({
            where: {
                id: journalId
            },
            data: {
                title: title
            }
        })
        if (!res) return { success: false, message: "Couldn't change the title" };
        return { success: true, data: { title: res.title } }
    } catch (error) {
        console.log(error)
    }
}

export async function updateJournalDescriptionById({journalId, description} : {journalId: string, description: string}) {
    try {
        const res = await prisma.journal_page.update({
            where: {
                id: journalId
            },
            data: {
                description: description
            }
        })
        if (!res) return { success: false, message: "Couldn't change the title" };
        return { success: true, data: { description: res.description } }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteJournalPageById(id:string) {
    try {
        await prisma.journal_page.delete({
            where: {
                id: id
            }
        })

        return {success: true, message: 'Successfully deleted the journal page'}
    } catch (error) {
        console.log(error);
        return {success: false, message: 'something went wrong!'}
    }
}

export async function getJournalPageByDateRangeServerAction({from, to} : {from: Date, to: Date}) {
    try {
        const user_id = await getLoggedInUserProfileId();
        if (!user_id) return {
            success: false,
            message: "Unauthorized",
        }
        const response = await prisma.journal_page.findMany({
            where: {
                user_id: user_id,
                created_at: {
                    gte: from,
                    lte: to,
                }
            },
            orderBy: {
                created_at: 'desc'
            },
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
        const response = await prisma.journal_page.findFirst({
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
        const response = await prisma.journal_block.findMany({
            where: {
                journalId: journalId
            },
            orderBy: {
                created_at: 'asc'
            }
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

export async function createJournalPage(userId: string) {
    try {
        const res = await prisma.journal_page.create({
            data: {
                title: "Title",
                user_id: userId,
                updated_at: new Date(),
                created_at: new Date(),
            }
        })
        if (!res) return {
            success: false,
            message: "Couldn't create a journal page",
        }
        return {
            success: true,
            message: "Successfully created a journal page",
            data: {
                id: res.id,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function createNewJournalBlockServerAction({ journalId, type, jsonObj, createdAt, updatedAt }: { journalId: string, type: string, jsonObj: JsonObjType, createdAt: Date, updatedAt: Date }) {
    try {
        const res = await prisma.journal_block.create({
            data: {
                journalId: journalId,
                type: type,
                jsonObj: jsonObj,
                created_at: createdAt,
                updated_at: updatedAt,
            }
        })
        if (!res) return {
            success: false,
            message: "Couldn't create the block"
        }
        return {
            success: true,
            message: "successfully created block"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function createManyNewJournalBlocksServerAction({ journalBlocks }: { journalBlocks: JournalBlockType[] }) {
    const data = journalBlocks.map((item) => {
        return {
            created_at: item.created_at,
            updated_at: item.updated_at,
            type: item.type,
            jsonObj: item.jsonObj,
            journalId: item.journalId
        }
    })
    try {
        const res = await prisma.journal_block.createMany({
            data: data
        })

        if (res.count < journalBlocks.length) return { success: false, message: 'couldnt save all blocks' };

        return {
            success: true,
            message: 'Successfully saved all the blocks'
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Something went wrong!',
        }
    }
}

export async function updateJournalBlockServerAction({ id, jsonObj, updatedAt }: { id: string, jsonObj: JsonObjType, updatedAt: Date }) {
    try {
        const res = await prisma.journal_block.update({
            where: {
                id: id
            },
            data: {
                jsonObj: jsonObj,
                updated_at: updatedAt,
            }
        })
        if (!res) return {
            success: false,
            message: "Couldn't create the block"
        }
        return {
            success: true,
            message: "successfully created block"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function updateManyJournalBlocksServerAction({ journalBlocks }: { journalBlocks: JournalBlockType[] }) {
    try {
        journalBlocks.forEach(async (item) => {
            const res = await prisma.journal_block.update({
                where: { id: item.id },
                data: {
                    jsonObj: item.jsonObj,
                    updated_at: item.updated_at,
                },
            })

            if (!res) return { success: false, message: 'couldnt save all the blocks, but some are saved' }
        })
        return {
            success: true,
            message: 'Successfully saved all the blocks'
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Something went wrong!',
        }
    }
}

export async function deleteJournalBlockByIdServerAction(id: string) {
    try {
        const res = await prisma.journal_block.delete({
            where: {
                id: id
            }
        })

        if (!res) return {success: false, message: 'couldnt delete the journal block'}

        return {success: true, message: 'successfully deleted the journal block'}
    } catch (error) {
        console.log(error)
        return {success: false, message: 'something went wrong'}
    }
}

export async function deleteManyJournalBlockByIdServerAction(ids: string[]) {
    try {
        const res = await prisma.journal_block.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        if (!res) return {success: false, message: 'couldnt delete the journal blocks'}

        return {success: true, message: 'successfully deleted the journal blocks'}
    } catch (error) {
        console.log(error)
        return {success: false, message: 'something went wrong'}
    }
}