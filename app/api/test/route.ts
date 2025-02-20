import client from '@/db';
import {   NextResponse } from 'next/server';

export async function GET() {
  try {
      // Fetch all analytics data from the database
      const data = await client.query(`
          SELECT AnalyticsData {
              event,
              timestamp,
              user_id,
              metadata: {
                  source,
                  device
              }
          }
      `);

      return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
      console.error('EdgeDB Connection Error:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
