import client from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
     // Fetch analytics data filtered by event type "login"
     const data: { user_id: string; timestamp: string; metadata: { source: string; device: string } }[] = await client.query(`
      SELECT AnalyticsData {
          event,
          timestamp,
          user_id,
          metadata: {
              source,
              device
          }
      } 
      FILTER .event = 'page_view'
  `);

  // Format the data into a table-like structure
  const formattedData = data.map((entry) => ({
      User: entry.user_id,
      Country: entry.metadata.source,
      Device: entry.metadata.device,
      Date: entry.timestamp
  }));

  return NextResponse.json({ formattedData }, { status: 200 });
  } catch (error) {
      console.error('EdgeDB Connection Error:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
