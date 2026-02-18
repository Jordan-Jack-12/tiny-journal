import { PrismaClient, Prisma, JournalTypeEnum } from "../lib/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL_LOCAL,
})

const prisma = new PrismaClient({
    adapter,
});

export async function main() {
    const user = await prisma.user.create({
        data: {
            email: "wolframstudio74w@gmail.com",
            hashedPassword: "12345678",
            salt: "somethinggibberish",
        }
    })

    const userProfile = await prisma.userProfile.create({
        data: {
            email: user.email,
            firstName: "Jordan",
            lastName: "Jack",
            profileColor: "#345678",
            createdAt: new Date(),
            userId: user.id,
        }
    })

    const journalPage = await prisma.journalPage.create({
        data: {
            userId: userProfile.id,
            createdAt: new Date(),
            title: "First Journal",
            description: "This is the first journal."
        }
    })

    const json1 = { text: "hello world" } as Prisma.JsonObject
    const json2 = { text: "not a world"} as Prisma.JsonObject
    const json3 = { text: "What is that"} as Prisma.JsonObject
    const json4 = { text: "I dont know"} as Prisma.JsonObject
    const json5 = { text: "bye bye world"} as Prisma.JsonObject

    const journalBlocks = await prisma.journalBlock.createMany({
        data: [
            {
                journalId: journalPage.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                jsonObj: json1,
                type: JournalTypeEnum.NOTE
            },
            {
                journalId: journalPage.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                jsonObj: json2,
                type: JournalTypeEnum.NOTE
            },
            {
                journalId: journalPage.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                jsonObj: json3,
                type: JournalTypeEnum.NOTE
            },
            {
                journalId: journalPage.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                jsonObj: json4,
                type: JournalTypeEnum.NOTE
            },
            {
                journalId: journalPage.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                jsonObj: json5,
                type: JournalTypeEnum.NOTE
            }
        ]
    })

    console.log("Seed completed successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });