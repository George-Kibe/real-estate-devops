import connect from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (request) => {
    const {email, password, name, firstName, lastName, isProfessional, profession} = await request.json();
    
    // console.log(email, password, name, firstName, lastName, isProfessional, profession)

    await connect();
    const newUser = new User({
        email,
        name: name || email.split("@")[0], 
        firstName: firstName || email.split("@")[0],
        lastName: lastName || "",
        isProfessional: isProfessional || false,
        profession: profession || "",
        password: password
    })
    
    try {
        // check if user already exists using email to avoid duplicates
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("Existing user", existingUser)
            return new NextResponse("User already exists", {status: 422})
        }
        await newUser.save();
        return new NextResponse("User has been created", {status: 201})
    } catch (error) {
        return new NextResponse(error.message, {status: 500,})
    }

}

export const GET = async (request) => {
    const params = new URLSearchParams(request.url.split('?')[1]);
    const email = params.get("email")
    await connect();
    try {
        // check if user already exists using email to avoid duplicates
        if (email){
            const user = await User.findOne({email}).populate('members').populate('organization');
            if (!user) {
                return new NextResponse("User not found", {status: 404})
            }
            const userObject = JSON.stringify(user)
            return new NextResponse(userObject, {status: 200}, )
        }
        const users = await User.find();
        const usersObject = JSON.stringify(users)
        return new NextResponse(usersObject, {status: 200},)
    } catch (error) {
        return new NextResponse(error.message, {status: 500,})
    }
}

export const PUT = async (request) => {
    const body = await request.json();
    const {_id} = body;
    try {
      const newUserDoc = await User.findOneAndUpdate({_id}, {...body});
      const updatedUserDoc = await User.findOne({
        _id: newUserDoc._id,
      })

      const newUser = JSON.stringify(updatedUserDoc);
      return new NextResponse(newUser, {status: 200});
    } catch (error) {
      console.log('User Updating error!');
      return new NextResponse(error.message, {status: 422});
    }
}