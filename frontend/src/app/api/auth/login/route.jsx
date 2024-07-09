import connect from '@/lib/db';
import User from '../../../../models/User';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

async function handler(req, res) {
  await connect();
  if (req.method === 'POST') {
    const { email, password } = await req.json();

    //const user = await User.findOne({ email }).populate('organization');
    const user = await User.findOne({
      $or: [
        { email: email }, 
        { name: email }
      ]
    }).populate('organization');
    if (!user) {
      return new NextResponse('User not found', { status: 401 });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new NextResponse('Incorrect password', { status: 401 });
    }
    // You can add additional logic here if needed, such as creating a session or JWT token.
    const loggedUser = JSON.stringify(user)
    return new NextResponse(loggedUser, { status: 200 });
  }

  return new NextResponse('Method not allowed', { status: 405 });
}

export { handler as POST };