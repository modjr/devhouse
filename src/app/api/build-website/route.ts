import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BuildWebsite from '@/app/models/BuildWebsite';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('Received build website form data:', body);
    const buildWebsite = await BuildWebsite.create(body);
    console.log('Created build website request:', buildWebsite);
    return NextResponse.json({ success: true, data: buildWebsite }, { status: 201 });
  } catch (error) {
    console.error('Error in build website form submission:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

