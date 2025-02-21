import { NextRequest, NextResponse } from 'next/server';
import client from '.';


type AnalyticsEntry = {
    event: string;
    timestamp: string;
    user_id: string;
    metadata: AnalyticsMetaData
};

type AnalyticsMetaData = {
    source: string;
    device: string;
}


//todo type this
export const insertAnalyticsEntry = async (entry: AnalyticsEntry) => {
    const { event, timestamp, user_id } = entry;
    try {
      const timestampDate = new Date(timestamp);
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
        timestamp: timestampDate,  
        user_id, 
        source: entry.metadata.source, 
        device: entry.metadata.device
      });

      return result;
    } catch(err: unknown){
        console.error("Database insertion error:", err);
        throw new Error(`Error inserting analytics: ${(err as Error).message}`);
    }
}

 