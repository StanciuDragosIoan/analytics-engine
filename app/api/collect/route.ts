 
import client from '@/db';
import { NextRequest, NextResponse } from 'next/server';
 
// Connect to the EdgeDB instance using the connection string from the .env file
 

export async function GET(request: NextRequest) {
    // // Method 1: Using request.json() (for JSON bodies)
    // try {
    //   const body = await request.json().catch(() => null)
      
    //   // Method 2: Using request.text() (for raw text)
    //   const rawText = await request.text().catch(() => null)
      
    //   // Method 3: Using URL search params
    //   const searchParams = request.nextUrl.searchParams
    //   const paramValue = searchParams.get('key')
  
    //   return Response.json({
    //     method: 'GET',
    //     bodyJson: body,
    //     rawText: rawText,
    //     queryParam: paramValue
    //   })
    // } catch (error) {
    //   return Response.json({ 
    //     error: 'Unable to read request body', 
    //     details: error instanceof Error ? error.message : 'Unknown error' 
    //   }, { status: 400 })
    // }

    try {
      // Parse request body
      const { event, timestamp, user_id, metadata } = { event: "test", timestamp: "test", user_id: 'test', metadata: {
        source: 'test', device: 'string'
      }};
  
      // Validate required fields
      if (!event || !timestamp || !user_id || !metadata?.source || !metadata?.device) {
        return new NextResponse('Missing required fields in the body', { status: 400 });
      }
  
      const { source, device } = metadata;
  
      // Convert timestamp string to a JavaScript Date object
      const timestampDate = new Date(timestamp);
      if (isNaN(timestampDate.getTime())) {
        return new NextResponse('Invalid timestamp format', { status: 400 });
      }
  
      // Send timestamp as a JavaScript Date object directly
      const result = await client.querySingle(`
        INSERT AnalyticsData {
          event := <str>$event,
          timestamp := <datetime>$timestamp,
          user_id := <str>$user_id,
          metadata := (
            INSERT Metadata {
              source := <str>$source,
              device := <str>$device
            }
          )
        }
      `, { 
        event, 
        timestamp: timestampDate,  // Pass as a Date object (EdgeDB handles the conversion)
        user_id, 
        source, 
        device 
      });
  
      return NextResponse.json({ message: 'Event collected successfully', result });
  }


  export async function POST(request: NextRequest) {
    try {
      // Parse request body
      const { event, timestamp, user_id, metadata } = await request.json();
  
      // Validate required fields
      if (!event || !timestamp || !user_id || !metadata?.source || !metadata?.device) {
        return new NextResponse('Missing required fields in the body', { status: 400 });
      }
  
      const { source, device } = metadata;
  
      // Convert timestamp string to a JavaScript Date object
      const timestampDate = new Date(timestamp);
      if (isNaN(timestampDate.getTime())) {
        return new NextResponse('Invalid timestamp format', { status: 400 });
      }
  
      // Send timestamp as a JavaScript Date object directly
      const result = await client.querySingle(`
        INSERT AnalyticsData {
          event := <str>$event,
          timestamp := <datetime>$timestamp,
          user_id := <str>$user_id,
          metadata := (
            INSERT Metadata {
              source := <str>$source,
              device := <str>$device
            }
          )
        }
      `, { 
        event, 
        timestamp: timestampDate,  // Pass as a Date object (EdgeDB handles the conversion)
        user_id, 
        source, 
        device 
      });
  
      return NextResponse.json({ message: 'Event collected successfully', result });
    } catch (error) {
      console.error('Error inserting event:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
 