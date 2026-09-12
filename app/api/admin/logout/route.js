import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("admin_token");
        return Response.json({ code: 200, message: "Logged out successfully" });
    } catch (error) {
        return Response.json({ code: 500, message: error.message });
    }
}
