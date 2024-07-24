import connect from '@/lib/db';
import User from '@/models/User';
import {NextResponse} from 'next/server';

export async function POST(req) {
  await connect();
  if (req.method === 'POST') {
    const {
      ownerId,
      staffId,
    } = await req.json();
    if (ownerId === staffId) {
      return new NextResponse("You cannot Remove yourself", {status: 422})
    }
    
    try {
      // find organization owner then add remove the staff member
      let staff = await User.findOne({_id: staffId});
      let user = await User.findOne({_id: ownerId});
      if (!user) {
        return new NextResponse("User Organization not found", {status: 404})
      }
      if (!staff) {
        return new NextResponse("Staff Member not found", { status: 404 });
      }
      // Remove staff member from organization
      user.members = user.members.filter(m => m._id.toString() !== staffId);
      staff.organization = null;
      staff.role = '';
      // console.log("Staff Member: ", staff);
      // console.log("User: ",user);
      await user.save();
      await staff.save();
      return new NextResponse('Staff Removed from organization successfully', {status: 200});
    } catch (error) {
      console.error(error.message);
      return NextResponse.json({message: 'Removing Staff Member failed!'});
    }
  } else {
    return NextResponse.json({message: 'Method not allowed'});
  }
}