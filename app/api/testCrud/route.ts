import { AnalyticsEntry, insertAnalyticsEntry } from '@/db/crud';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      // Parse request body
    //   const { event, timestamp, user_id, metadata } = await request.json();

    const dummyData: AnalyticsEntry = {
        event: "testEvent",
        timestamp: "2025-02-21T12:34:56Z",
        user_id: "test",
        metadata: {
            device: "test123",
            source: "test123Srouce"
        }
    }
    const { event, timestamp, user_id, metadata } = dummyData;
  
      // Validate required fields
      if (!event || !timestamp || !user_id || !metadata?.source || !metadata?.device) {
        return new NextResponse('Missing required fields in the body', { status: 400 });
      }

  
      // Convert timestamp string to a JavaScript Date object
      const timestampDate = new Date(timestamp);
      if (isNaN(timestampDate.getTime())) {
        return new NextResponse('Invalid timestamp format', { status: 400 });
      }
  
      // Send timestamp as a JavaScript Date object directly
      const result = await insertAnalyticsEntry({
        event,
        timestamp,
        user_id,
        metadata
      });

      console.log("result here", JSON.stringify(result));
  
      return NextResponse.json({ message: `event collected: ${JSON.stringify(result, null, 2)}`, result });
    } catch (error) {
      console.error('Error inserting event:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
 