import connect from '@/lib/db';
import User from '@/models/User';
import {NextResponse} from 'next/server';

export async function POST(req) {
  await connect();
  if (req.method === 'POST') {
    const {
      ownerId,
      inviteeId,
    } = await req.json();
    if (ownerId === inviteeId) {
      return new NextResponse("You cannot invite yourself", {status: 422})
    }
    
    try {
      // find organization owner then add the new member
      let member = await User.findOne({_id: inviteeId});
      let user = await User.findOne({_id: ownerId});
      if (!user) {
        return new NextResponse("User not found", {status: 404})
      }
      if (!member) {
        return new NextResponse("Member not found", { status: 404 });
      }
      // add new member to organization invited
      // avoid duplicate members
      if (user.members.includes(member._id)) {
        return new NextResponse("User already a member", {status: 400})
      }
      user.members.push(member);
      member.organization = user;
      console.log("Member: ",member);
      console.log("User: ",user);
      await user.save();
      await member.save();
      return new NextResponse('User Added successfully', {status: 200});
    } catch (error) {
      console.error(error.message);
      return NextResponse.json({message: 'Adding user failed!'});
    }
  } else {
    return NextResponse.json({message: 'Method not allowed'});
  }
}