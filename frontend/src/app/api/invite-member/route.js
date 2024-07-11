import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  if (req.method === 'POST') {
    const {
      username,
      name,
      email,
      role,
      _id,
    } = await req.json();

    try {
      // Create a Nodemailer transport object (configure with your email provider)
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
        subject: `Invitation to ${username}'s UnlimitedRent Organization`,
        html: `
        <h2>Invitation to ${username}'s UnlimitedRent Organization</h2>
        <p><strong>Greetings </strong> ${name}</p>
        <p>You have been invited by ${username} to join their UnlimitedRent Organization to be their ${role}. Please click the link below to accept the invitation:</p>
        <a href=${process.env.NEXT_PUBLIC_FRONTEND_URL}/accept-invite/${_id}/?role=${role}>ACCEPT INVITATION</a>
        <p>PS: If the above button does not work, copy paste this link in your browser ${process.env.NEXT_PUBLIC_FRONTEND_URL}/accept-invite/${_id}/?role=${role}</p>
        <p>Thanks and have a good time.</p>
      `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({message: 'Email has been sent'});
    } catch (error) {
      console.error(error);

      return NextResponse.json({message: 'Error sending email'});
    }
  } else {
    return NextResponse.json({message: 'Method not allowed'});
  }
}