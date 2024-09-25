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
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <tr style="background-color: #0044cc; color: #ffffff;">
                    <td style="padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">Reset Your Password</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <h2>Please click the link below to change your password</h2>
                        <p style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/${_id}" style="display: inline-block; padding: 12px 20px; background-color: #0044cc; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">RESET PASSWORD</a>
                        </p>
                        <p>PS: If the above button does not work, copy and paste this link in your browser:</p>
                        <p style="word-break: break-all;">
                            <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/${_id}" style="color: #0044cc; text-decoration: none;">${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/${_id}</a>
                        </p>
                        <p>Thanks and have a good time.</p>
                        <h2>If you did not make this request, kindly ignore this email.</h2>
                    </td>
                </tr>
                <tr style="background-color: #f4f4f4; color: #888888;">
                    <td style="padding: 10px; text-align: center; font-size: 12px;">
                        &copy; 2024 AptTracking. All rights reserved.
                    </td>
                </tr>
            </table>
        </body>
        </html>
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