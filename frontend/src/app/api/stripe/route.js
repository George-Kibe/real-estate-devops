import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {email, password} = await req.json();
        console.log(email, password);
        return new NextResponse("User has been created", {status: 201})
    } catch (error) {
        return new NextResponse("Internal Server Error", {status: 500})
    }
}