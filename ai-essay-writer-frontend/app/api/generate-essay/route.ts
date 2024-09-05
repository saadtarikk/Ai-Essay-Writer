import { NextResponse } from 'next/server';
import { generateEssay } from '@/lib/api';

export async function POST(req: Request) {
  console.log('API route: generate-essay called');
  try {
    const { topic } = await req.json();
    console.log('Received topic:', topic);
    const essay = await generateEssay(topic);
    console.log('Generated essay:', essay);
    return NextResponse.json({ essay });
  } catch (error) {
    console.error('Error generating essay:', error);
    return NextResponse.json({ error: 'Failed to generate essay' }, { status: 500 });
  }
}

