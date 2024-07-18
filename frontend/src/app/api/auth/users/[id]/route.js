import connect from '@/lib/db';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';

// function to delete a user from the database by Id
export const DELETE = async (request, {params}) => {
  const {id} = params;
  try {
      await connect();
      await User.findByIdAndDelete(id);
      return new NextResponse("User has been deleted!", {status:200})
  } catch (error) {
      return new NextResponse("Internal Server Error", { status:500})
  }
}

export const GET = async (request, {params}) => {
  const {id} = params;
  try {
      await connect();
      const user = await User.findById(id);
      if (!user) {
        return new NextResponse("User not found", {status: 404})
      }
      const userDoc = JSON.stringify(user);
      return new NextResponse(userDoc, {status: 200});
  } catch (error) {
      return new NextResponse("Internal Server Error", { status:500})
  }
}

export const PUT = async (request, {params}) => {
  const body = await request.json();
  const {id} = params;
  try {
    await connect();
    const newUserDoc = await User.findOneAndUpdate({_id:id}, {...body});
    if (!newUserDoc) return new NextResponse("User not found", {status: 404})
    const updatedUserDoc = await User.findOne({
      _id: newUserDoc._id,
    }).populate('organization');

    const newUser = JSON.stringify(updatedUserDoc);
    return new NextResponse(newUser, {status: 200});
  } catch (error) {
    console.log('User Updating error!');
    return new NextResponse(error.message, {status: 422});
  }
}