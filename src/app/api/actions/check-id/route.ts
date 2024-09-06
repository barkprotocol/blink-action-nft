import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/(mongo)/db';
import OrgData from '@/app/(mongo)/OrgSchema';

// Named export for POST request
export const POST = async (req: Request) => {
  try {
    // Parse the JSON body
    const { uniqueId } = await req.json();

    // Validate input
    if (!uniqueId) {
      return new NextResponse(
        JSON.stringify({ message: 'uniqueId is required' }), 
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the organization by uniqueId
    const org = await OrgData.findOne({ orgPrivateId: uniqueId });

    // Check if the organization exists
    if (!org) {
      return new NextResponse(
        JSON.stringify({ exists: false }), 
        { status: 200 }
      );
    }

    // Return the organization data along with the `exists` status
    return new NextResponse(
      JSON.stringify({
        exists: true,
        org, // Send the full organization details
      }),
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);
    
    // Return a 500 Internal Server Error response
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }), 
      { status: 500 }
    );
  }
};
