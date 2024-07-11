import connect from '@/lib/db';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"

export const PUT = async (request) => {
  const body = await request.json();
  const { _id, password } = body;
  const hashedPassword = await bcrypt.hash(password, 5);
  
  try {
    await connect();
    // const user = await User.findOne({_id});
    // console.log("User: ", user);
    const updatedUser = await User.findOneAndUpdate({_id:_id}, {password:hashedPassword});
    if (!updatedUser) return new NextResponse("User not found", {status: 404})
    return new NextResponse("Password Changed successfully!", {status: 200});
  } catch (error) {
    console.log('User Updating error!');
    return new NextResponse(error.message, {status: 422});
  }
}