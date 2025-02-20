import client from '@/db';

export default async function Dashboard() {
  function extractLocale(userId: string) {
    const match = userId.match(
      /_[a-z]{2}-[A-Z]{2}$/
    );
    return match ? match[0].slice(1) : null; // Remove the leading underscore
  }

  try {
    const data: {
      user_id: string;
      timestamp: string;
      metadata: {
        source: string;
        device: string;
      };
    }[] = await client.query(`
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
      Date: entry.timestamp,
    }));

    return (
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>
          Dashboard
        </h1>
        <table className='min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-blue-600 text-white'>
              <th className='p-3 text-left font-semibold border-b'>
                User
              </th>
              <th className='p-3 text-left font-semibold border-b'>
                Country
              </th>
              <th className='p-3 text-left font-semibold border-b'>
                Device
              </th>
              <th className='p-3 text-left font-semibold border-b'>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((entry, index) => (
              <tr
                key={index}
                className='border-b hover:bg-blue-100 transition duration-200 ease-in-out'
              >
                <td className='p-3 text-gray-800 border-b'>
                  {entry.User}
                </td>
                <td className='p-3 text-gray-800 border-b'>
                  {extractLocale(entry.User)}
                </td>
                <td className='p-3 text-gray-800 border-b'>
                  {entry.Device}
                </td>
                <td className='p-3 text-gray-800 border-b'>
                  {new Date(
                    entry.Date
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (err) {
    console.log('err', err);
    return (
      <div className='p-6'>
        <p className='text-red-600'>
          Error: {JSON.stringify(err, null, 2)}
        </p>
      </div>
    );
  }
}
