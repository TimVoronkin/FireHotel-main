import { Locker } from '@/types/lockers';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function Search() {
  const { data: lockers = [] } = useQuery<Locker[]>({
    queryKey: ['lockers'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/lockers');
      if (!response.ok) {
        throw new Error('Failed to fetch lockers');
      }
      return response.json();
    },
  });

const [apiKey, setApiKey] = useState('');
const [cells, setCells] = useState<{ locker_id: number }[]>([]);

useEffect(() => {
  fetch('http://localhost:3000/api/cells')
    .then((response) => response.json())
    .then((data) => setCells(data))
    .catch((error) => console.error('Error fetching cells:', error));
}, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/config')
      .then((response) => response.json())
      .then((data) => setApiKey(data.googleMapsApiKey))
      .catch((error) => console.error('Error fetching API key:', error));
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 mt-20 flex-1">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Our Branches</h1>
        <p className="text-lg mt-4">
          Explore our branches across various cities. Find the nearest branch and contact us for more information.
        </p>
      </div>

      {/* Branch List */}
      <div className="flex flex-col gap-10 w-full max-w-6xl">
        {lockers.length === 0 ? (
          <p className="text-center text-lg">No branches available</p>
        ) : (
          lockers.map((locker: Locker) => (
            <div
              key={locker.id}
              className="flex flex-row items-start gap-10 bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              {/* Branch Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{locker.location}</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Number of rooms: <span className="font-semibold">{cells.filter((cell) => cell.locker_id === locker.id).length}</span>
                </p>
                <p className="mt-4">
                  Our branch in {locker.location} offers modern and secure storage solutions for your belongings.
                </p>
                <button
                  onClick={() => alert(`Contacting branch: ${locker.location}`)}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Call Us
                </button>
              </div>

              {/* Map */}
              <div className="w-1/2 h-64 rounded-lg overflow-hidden">
                {apiKey && (
                    <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
                      `${locker.location} ${locker.name}`
                    )}`}
                    ></iframe>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;