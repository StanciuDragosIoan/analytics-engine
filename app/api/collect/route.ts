 
import { NextRequest } from 'next/server';
 
// Connect to the EdgeDB instance using the connection string from the .env file
 

export async function GET(request: NextRequest) {
    // Method 1: Using request.json() (for JSON bodies)
    try {
      const body = await request.json().catch(() => null)
      
      // Method 2: Using request.text() (for raw text)
      const rawText = await request.text().catch(() => null)
      
      // Method 3: Using URL search params
      const searchParams = request.nextUrl.searchParams
      const paramValue = searchParams.get('key')
  
      return Response.json({
        method: 'GET',
        bodyJson: body,
        rawText: rawText,
        queryParam: paramValue
      })
    } catch (error) {
      return Response.json({ 
        error: 'Unable to read request body', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 })
    }
  }


  export async function POST(request: NextRequest) {
    // Method 1: Using request.json() (for JSON bodies)
    try {

    const allowedOrigin = 'https://your-client-domain.com';
    const origin = request.headers.get('Origin');
    
    // if (origin !== allowedOrigin) {
    //     return new NextResponse('Forbidden', { status: 403 });
    // }
    const body = await request.json().catch(() => null)
    
    // Method 2: Using request.text() (for raw text)
    const rawText = await request.text().catch(() => null)
    
    // Method 3: Using URL search params
    const searchParams = request.nextUrl.searchParams
    const paramValue = searchParams.get('key')

    return Response.json({
    method: 'POST',
    bodyJson: body,
    rawText: rawText,
    queryParam: paramValue
    })
    } catch (error) {
      return Response.json({ 
        error: 'Unable to read request body', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 400 })
    }
  }

// export async function POST(request: Request) {
//     try {
//       // Parse the incoming request body (data from the client)
//       const { event, url, userId, timestamp } = await request.json();
  
//       // Query EdgeDB to insert the data into the database
//       const result = await client.querySingle(`
//         INSERT CollectEvent {
//           event_name := <str>$event,
//           url := <str>$url,
//           user_id := <str>$userId,
//           timestamp := <datetime>$timestamp
//         }
//       `, { event, url, userId, timestamp });
  
//       // Respond with the success message
//       return NextResponse.json({ message: 'Event collected successfully', result });
//     } catch (error) {
//       console.error('Error inserting event:', error);
//       return new NextResponse('Internal Server Error', { status: 500 });
//     }
//   }