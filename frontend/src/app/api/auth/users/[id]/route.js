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