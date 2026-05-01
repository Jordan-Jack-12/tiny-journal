import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server"

export async function getLoggedInUserFirstName() {
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.auth.getClaims();
        if (error) return null;
        const response = await prisma.userProfile.findFirst({where: {userId: data?.claims.sub}, select: {first_name: true}})
        if (!response) return null;
        return response.first_name
    } catch (error) {
        console.log(error);
        return null;
    }
}