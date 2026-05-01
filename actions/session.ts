'use server'

import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { createClient } from "@/lib/supabase/server";
import { LogInSchema, SignUpSchema } from "@/lib/zodSchemas";
import { pickRandomColor } from "@/util/random-picker";

export async function supabaseSignUp(formData: FormData) {
    console.log(formData)
    const email = formData.get('email');
    const password = formData.get('password');
    const first_name = formData.get('first-name');
    const last_name = formData.get('last-name');

    try {
        const schemaCheck = SignUpSchema.safeParse({ email, password, first_name, last_name })
        if (schemaCheck.error) return
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signUp({
            email: schemaCheck.data.email,
            password: schemaCheck.data.password,
            options: {
                emailRedirectTo: 'https://tinyjournal.com/dashboard',
                data: {
                    first_name: schemaCheck.data.first_name,
                    last_name: schemaCheck.data.last_name
                }
            },
        })
        const color = pickRandomColor()
        if (!error && data.user) {
            await prisma.userProfile.create({
                data: {
                    userId: data.user.id,
                    first_name: schemaCheck.data.first_name,
                    last_name: schemaCheck.data.last_name,
                    email: schemaCheck.data.email,
                    profile_color: color,
                    created_at: data.user.created_at
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function supabaseLogIn(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log("calling signin functione")
    try {
        const schemaCheck = LogInSchema.safeParse({ email, password })
        if (schemaCheck.error) return;
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email: schemaCheck.data.email, password: schemaCheck.data.password})
    } catch (error) {
        console.log(error)
    }
}

export async function getLoggedInUserProfileId() {
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.auth.getClaims()
        if (!error) {
            const res = await prisma.userProfile.findFirst({where: {userId: data?.claims.sub}, select: {id: true}});
            if (!res) return null;
            return res.id;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function redisTest() {
    try {
        await redis.set('count', 1);
        const data = await redis.get('count');

        console.log(data);
    } catch (error) {
        console.log(error)
    }
}
