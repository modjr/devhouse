import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/app/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('Received contact form data:', body);
    const contact = await Contact.create(body);
    console.log('Created contact:', contact);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

