// db.ts
import { createClient } from 'edgedb';

// Create an EdgeDB client instance
const client = createClient();

// Optionally, you can configure it to use a connection string (e.g., from an `.env` file)
// const client = createClient({
//   dsn: process.env.EDGEDB_DSN // Replace with your EdgeDB DSN if needed
// });
// Function to get all entries from a given table
type QueryResult<T> = Promise<T[]>;

export async function getAllPeople(): QueryResult<{ name: string }> {
    return await client.query("SELECT Person { name };");
  }
  
  export async function getAllMovies(): QueryResult<{ title: string; actors: { name: string }[] }> {
    return await client.query("SELECT Movie { title, actors: { name } };");
  }
  
  export async function getAllMetadata(): QueryResult<{ source: string; device: string }> {
    return await client.query("SELECT Metadata { source, device };");
  }
  
  export async function getAllAnalyticsData(): QueryResult<{ event: string; timestamp: string; user_id: string; metadata: { source: string; device: string } }> {
    await client.ensureConnected();
    return await client.query(
      "SELECT AnalyticsData { event, timestamp, user_id, metadata: { source, device } };");
  }
  

export default client;
