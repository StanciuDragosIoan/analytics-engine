import client from '@/db';

export default async function Dashboard() {
  function extractLocale(userId: string) {
    const match = userId.match(/_[a-z]{2}-[A-Z]{2}$/);
    return match ? match[0].slice(1) : null; // Remove the leading underscore
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  // Get current date and calculate start of day, week, and month
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  const startOfMonth = new Date(currentDate.setDate(1));

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
      FILTER .event = 'page_view'
    `);

    // Reverse the data to show latest first
    const reversedData = data.reverse();

    // Format the data into a table-like structure
    const formattedData = reversedData.map((entry) => ({
      User: entry.user_id,
      Country: entry.metadata.source,
      Device: entry.metadata.device,
      Date: entry.timestamp,
    }));

    // Get the number of users within the last day, week, and month
    const usersInLastDay = new Set<string>();
    const usersInLastWeek = new Set<string>();
    const usersInLastMonth = new Set<string>();

    data.forEach(entry => {
      const timestamp = new Date(entry.timestamp);
      if (timestamp >= startOfDay) {
        usersInLastDay.add(entry.user_id);
      }
      if (timestamp >= startOfWeek) {
        usersInLastWeek.add(entry.user_id);
      }
      if (timestamp >= startOfMonth) {
        usersInLastMonth.add(entry.user_id);
      }
    });

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Activity Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Users in the Last Day:</span>
              <span className="text-blue-600">{usersInLastDay.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Users in the Last Week:</span>
              <span className="text-blue-600">{usersInLastWeek.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Users in the Last Month:</span>
              <span className="text-blue-600">{usersInLastMonth.size}</span>
            </div>
          </div>
        </div>
        
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden mb-6">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left font-semibold border-b">User</th>
              <th className="p-3 text-left font-semibold border-b">Country</th>
              <th className="p-3 text-left font-semibold border-b">Device</th>
              <th className="p-3 text-left font-semibold border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-blue-100 transition duration-200 ease-in-out">
                <td className="p-3 text-gray-800 border-b">{entry.User}</td>
                <td className="p-3 text-gray-800 border-b">{extractLocale(entry.User)}</td>
                <td className="p-3 text-gray-800 border-b">{entry.Device}</td>
                <td className="p-3 text-gray-800 border-b">{formatDate(entry.Date)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      
      </div>
    );
  } catch (err) {
    console.log("err", err);
    return (
      <div className="p-6">
        <p className="text-red-600">Error: {JSON.stringify(err, null, 2)}</p>
      </div>
    );
  }
}
