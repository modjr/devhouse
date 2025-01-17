import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BuildWebsite from '@/app/models/BuildWebsite';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('Received build website form data:', body);

    // Validate the input data
    if (!body.email || !body.serviceType || !body.mobile || !body.firstName || !body.lastName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Save form data to MongoDB
    const buildWebsite = await BuildWebsite.create(body);
    console.log('Created build website request:', buildWebsite);

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
      subject: 'New Website Build Request',
      text: `
        A new website build request has been submitted:
        - Email: ${body.email}
        - Service Type: ${body.serviceType}
        - Mobile: ${body.mobile}
        - First Name: ${body.firstName}
        - Last Name: ${body.lastName}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to contact@devhouse.dev');

    return NextResponse.json({ success: true, data: buildWebsite }, { status: 201 });
  } catch (error) {
    console.error('Error in build website form submission:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

