import connect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const params = new URLSearchParams(request.url.split('?')[1]);
    const owner_id = params.get("owner_id")
    await connect();
    try {
        // check if user already exists using owner_id to avoid duplicates
        if (owner_id){
            console.log("owner_id", owner_id)
            const user = await User.findById(owner_id).populate({
                path: 'members',
                select: '-password'
              })
            if (!user) {
                return new NextResponse("User not found", {status: 404})
            }
            return NextResponse.json(user.members, { status: 200 });
        }
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}