import connect from '@/lib/db';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (request) => {
  const body = await request.json();
  const {email} = body;
  try {
    await connect();
    const user = await User.findOne({email:email});
    if (!user) return new NextResponse("User not found", {status: 404})
    const _id = user._id;
    //send password reset email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'buenasconsultants@gmail.com',
        pass: process.env.BUENAS_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'buenasconsultants@gmail.com',
      to: email,
      subject: `Request to change your Password: Reason-forgotten`,
      html: `
      <h2>Please click the link below to change your password</h2>
      <a href=${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/${_id}>RESET PASSWORD</a>
      <p>PS: If the above button does not work, copy paste this link in your browser ${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/${_id}</p>
      <p>Thanks and have a good time.</p>
      <h2>If you did not make this request, kindly ignore this email</h2>
    `,
    };
    // Send the email
    await transporter.sendMail(mailOptions);

    return new NextResponse("Email successfully sent!", {status: 200});
  } catch (error) {
    console.log('User Updating error!');
    return new NextResponse(error.message, {status: 422});
  }
}