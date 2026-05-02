"use server"
import prisma from "@/lib/prisma";

export async function getAllScreeningTest() {
    try {
        const data = await prisma.test.findMany();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTestBySlug(slug: string) {
    try {
        const test = await prisma.test.findFirst({where: {slug: slug}})
        if (!test) return null;
        return test;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTestQuestions(slug: string) {
    try {
        const test = await prisma.test.findFirst({where: {slug: slug}})
        if (!test) return null;
        const res = await prisma.question.findMany({where: {test_id: test.id}, include: {option: true}});
        const data = res;
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTestQuestionsWithCheckBox(slug: string) {
    try {
        const test = await prisma.test.findFirst({where: {slug: slug}})
        if (!test) return null;
        const res = await prisma.question.findMany({where: {test_id: test.id}, include: {option: true}, orderBy: {order: 'asc'}});
        const data = res;
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getResult(option_ids: string[], test_id: string) {
    try {
        const scoreRes = await prisma.option.findMany({where: {id: {in: option_ids}}, select: {score: true}});
        if (scoreRes.length < 1) return null;
        const score = scoreRes.reduce((acc, item) => acc + item.score, 0);
        console.log(score)
        const results = await prisma.result.findMany({where: {
            testId: test_id
        }})
        if (!results || results.length < 1) return null;
        const result = results.find(i => score >= i.score_begin && score <= i.score_end);
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}