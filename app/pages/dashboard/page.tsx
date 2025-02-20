import client from '@/db';

 
 
 
export default async function Dashboard() {
  
  
  try {
  
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
      FILTER .event = 'login'
  `);

  // Format the data into a table-like structure
  const formattedData = data.map((entry) => ({
      User: entry.user_id,
      Country: entry.metadata.source,
      Device: entry.metadata.device,
      Date: entry.timestamp
  }));
    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border-r">User</th>
              <th className="p-2 border-r">Country</th>
              <th className="p-2 border-r">Device</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 border-r">{entry.User}</td>
                <td className="p-2 border-r">{entry.Country}</td>
                <td className="p-2 border-r">{entry.Device}</td>
                <td className="p-2">{new Date(entry.Date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
  } catch(err) {
    console.log("err", err);
    return <div>
      <p>Err: ${JSON.stringify(err, null, 2)}</p>
    </div>
  }
 

 

 
 
  return (
    <div>
      <h1>Dashboard</h1>
 
    </div>
  )
}