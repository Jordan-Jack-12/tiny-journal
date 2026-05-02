import { createClient } from "@/lib/supabase/server"

export async function getLoggedInUserFirstName() {
    try {
        const supabase = await createClient();
        const {data, error} = await supabase.auth.getClaims();
        if (error) return null;
        if (data?.claims.user_metadata?.first_name) return data?.claims.user_metadata?.first_name;
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}