import connect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import User from "@/models/User";

export const POST = async (request) => {
    const {email, password} = await request.json();

    await connect();
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = new User({
        email,
        password:hashedPassword
    })
    
    try {
        // check if user already exists using email to avoid duplicates
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return new NextResponse("User already exists", {status: 422})
        }
        await newUser.save();
        return new NextResponse("User has been created", {status: 201})
    } catch (error) {
        return new NextResponse(error.message, {status: 500,})
    }

}