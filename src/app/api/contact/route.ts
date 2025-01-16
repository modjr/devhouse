import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/app/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('Received contact form data:', body);

    // Validate the input data
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Save form data to MongoDB (including the phone number)
    const contact = await Contact.create(body);
    console.log('Created contact:', contact);

    // Configure nodemailer for sending email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'contact@devhouse.dev',
      subject: 'New Contact Form Submission',
      text: `
        A new contact form submission has been received:
        - Name: ${body.name}
        - Email: ${body.email}
        - Subject: ${body.subject}
        - Message: ${body.message}
        - Phone: ${body.phone } 
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to contact@devhouse.dev');

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
