import connectMongo from "../../../../utils/connectMongo";
import userModel from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        await connectMongo();
        const { email, password } = await req.json();
        const user = await userModel.findOne({ email });
        if (!user) {
            return Response.json({ code: 401, message: "User not found" });
        }
        
        // Compare plain text password against the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return Response.json({ code: 401, message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set HTTP-Only Cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        
        return Response.json({
            code: 200,
            message: "User logged in successfully",
            user: { email: user.email, username: user.username }
        });
    } catch (error) {
        return Response.json({ code: 500, message: error.message });
    }
}   