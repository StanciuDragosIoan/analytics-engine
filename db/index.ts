// db.ts
import { createClient } from 'edgedb';

// Create an EdgeDB client instance
const client = createClient();

// Optionally, you can configure it to use a connection string (e.g., from an `.env` file)
// const client = createClient({
//   dsn: process.env.EDGEDB_DSN // Replace with your EdgeDB DSN if needed
// });

export default client;
