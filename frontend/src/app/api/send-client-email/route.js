import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  if (req.method === 'POST') {
    const { name, email, link } = await req.json();
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
        subject: `Property Alert on AptTracking`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Invitation to AptTracking Organization</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <table style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                  <tr style="background-color: #0044cc; color: #ffffff;">
                      <td style="padding: 20px; text-align: center;">
                          <h2 style="margin: 0;">Property Alert on AptTracking</h2>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px;">
                          <p><strong>Greetings </strong> ${name},</p>
                          <p>We are pleased to bring to your attention this property which we think it is a good match for you.</p>
                          <p style="text-align: center; margin: 20px 0;">
                              <a href=${link} style="display: inline-block; padding: 12px 20px; background-color: #0044cc; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">VIEW PROPERTY</a>
                          </p>
                          <p>PS: If the above button does not work, copy and paste this link in your browser:</p>
                          <p style="word-break: break-all;">
                              <a href=${link} style="color: #0044cc; text-decoration: none;">${link}</a>
                          </p>
                          <p>Thanks and have a good time.</p>
                          <p>AptTracking</p>
                      </td>
                  </tr>
                  <tr style="background-color: #f4f4f4; color: #888888;">
                      <td style="padding: 10px; text-align: center; font-size: 12px;">
                          &copy; 2024 . AptTracking All rights reserved.
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