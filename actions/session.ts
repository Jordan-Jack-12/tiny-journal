'use server'

import { redis } from "@/lib/redis";


export async function redisTest() {
    try {
        const data = await redis.get('count');
        
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}
