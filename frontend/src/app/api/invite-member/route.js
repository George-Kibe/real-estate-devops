import connect from '@/lib/db';
import generatePassword from '@/lib/generatePassword';
import User from '@/models/User';
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      username,
      name,
      email,
      role,
      _id,
    } = await req.json();

    try {
      await connect()
      // create a user
      const existingUser = await User.findOne({email});
        if (existingUser) {
            return new NextResponse("User with this Email already exists!", {status: 422})
        }
      const password = generatePassword(8)
      const newUser = new User({ email, name: firstName + " " + lastName, firstName, lastName, role, password})
      let newStaff = await newUser.save();
      // console.log("Newly created Staff: ", newStaff);
      let owner = await User.findOne({_id});
      if (!owner) {
        return new NextResponse("No organization found. You may need to try again!", {status: 404})
      }
      owner.members.push(newStaff);
      newStaff.organization = owner;
      // console.log("Staff Member: ",newStaff);
      // console.log("User: ",owner);
      await owner.save();
      await newStaff.save();
      
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
        subject: `Invitation to ${username}'s Nuviane Organization`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Invitation to Nuviane Organization</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <table style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                  <tr style="background-color: #0044cc; color: #ffffff;">
                      <td style="padding: 20px; text-align: center;">
                          <h2 style="margin: 0;">Invitation to ${username}'s Nuviane Organization</h2>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px;">
                          <p><strong>Greetings </strong> ${name},</p>
                          <p>You have been invited by ${username} to join their Nuviane Organization as their ${role}. Please use these provided credentials to login and access their organization email:${email} password: ${password} </p>
                          <p style="text-align: center; margin: 20px 0;">
                              <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/login" style="display: inline-block; padding: 12px 20px; background-color: #0044cc; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">ACCEPT INVITATION</a>
                          </p>
                          <p>PS: If the above button does not work, copy and paste this link in your browser:</p>
                          <p style="word-break: break-all;">
                              <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}" style="color: #0044cc; text-decoration: none;">${process.env.NEXT_PUBLIC_FRONTEND_URL}/login</a>
                          </p>
                          <p>Thanks and have a good time.</p>
                      </td>
                  </tr>
                  <tr style="background-color: #f4f4f4; color: #888888;">
                      <td style="padding: 10px; text-align: center; font-size: 12px;">
                          &copy; 2024 . All rights reserved.
                      </td>
                  </tr>
              </table>
          </body>
          </html>
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