import { Locker } from '@/types/lockers';
import { Cell } from '@/types/cells';
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
  const [cells, setCells] = useState<Cell[]>([]);
  const [selectedLockerId, setSelectedLockerId] = useState<number | null>(null);
  const [showRooms, setShowRooms] = useState(false);

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

  // Parallax effect for background images and scattered objects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Parallax for art-1/art-2 (if used)
      const images = document.querySelectorAll('.parallax-bg');
      images.forEach((img, idx) => {
        const speed = idx === 0 ? 0.25 : 0.15;
        (img as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
      // Parallax for scattered objects
      const objs = document.querySelectorAll('.parallax-obj');
      objs.forEach((img) => {
        const speed = parseFloat((img as HTMLElement).getAttribute('data-parallax-speed') || '0.15');
        const rotate = (img as HTMLElement).getAttribute('data-rotate') || '0';
        (img as HTMLElement).style.transform = `rotate(${rotate}deg) translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 mt-20 flex-1 relative overflow-x-clip">

      {/* Header */}
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-red-500">Our Branches</h1>
        <p className="text-lg mt-4">Explore our branches across various cities. Find the nearest branch and see available rooms.</p>
      </div>

      {/* Branch List */}
      <div className="flex flex-col gap-10 w-full max-w-6xl z-10">
        {lockers.length === 0 ? (
          <p className="text-center text-lg">No branches available</p>
        ) : (
          lockers.map((locker: Locker) => {
            const branchRooms = cells.filter((cell) => cell.locker_id === locker.id);
            return (
              <div key={locker.id} className="bg-gray-900/60 backdrop-blur-md border border-gray-800 shadow-lg rounded-lg p-10" style={{
                backgroundColor: 'rgba(24,24,27,0.60)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}>
                <div className="flex-1 flex flex-col md:flex-row gap-6">
                  {/* Left: Info */}
                  <div className="flex-1 flex flex-col gap-2 justify-between">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-orange-400">
                      {locker.name} — {locker.location}
                    </h2>
                    {/* Description */}
                    <p className="text-gray-200 mb-2">
                      {locker.description || 'Our branch offers modern, comfortable rooms and excellent service for every guest.'}
                    </p>
                    {/* Room count and show button */}
                    <div className="flex items-center gap-4 mt-2 mb-2">
                      <span className="text-sm text-gray-400">
                        Available rooms:{' '}
                        <span className="font-semibold text-orange-400">{branchRooms.filter((r) => r.status === 'free').length}</span>/
                        <span className="font-semibold">{branchRooms.length}</span>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedLockerId(locker.id === selectedLockerId ? null : locker.id);
                          setShowRooms(locker.id !== selectedLockerId);
                        }}
                        className="px-4 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
                      >
                        {selectedLockerId === locker.id && showRooms ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  {/* Right: Map */}
                  <div className="w-full md:w-1/2 h-64 rounded-lg overflow-hidden flex-shrink-0">
                    {apiKey && (
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
                          `${locker.location} ${locker.name}`,
                        )}`}
                      ></iframe>
                    )}
                  </div>
                </div>

                {/* Room List (appears below info, not beside map) */}
                {selectedLockerId === locker.id && showRooms && (
                  <div
                    className="mt-4 transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in scale-100"
                    style={{ transformOrigin: 'top' }}
                  >
                    <h3 className="text-lg font-bold text-orange-400 mb-2">Available Rooms</h3>
                    {branchRooms.length === 0 ? (
                      <p className="text-gray-400">No rooms available at this branch.</p>
                    ) : (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {branchRooms.map((room) => (
                          <li key={room.id} className="bg-gray-800 rounded p-3 border border-gray-700 flex flex-col">
                            <span className="font-semibold text-gray-200">Room #{room.cellNumber}</span>
                            <span className="text-gray-400 text-sm whitespace-pre-line">
                              {room.size === 'studio'
                                ? 'Studio (one large room)\nIncludes a queen bed, private bathroom, kitchenette, Wi-Fi, TV, and workspace.'
                                : room.size === '1br'
                                  ? '1 Bedroom Apartment\nSeparate bedroom, living area, full kitchen, private bathroom, Wi-Fi, TV, workspace, and balcony.'
                                  : room.size === '2br'
                                    ? '2 Bedroom Apartment\nTwo bedrooms, spacious living room, full kitchen, two bathrooms, Wi-Fi, TV, workspace, balcony, and laundry facilities.'
                                    : room.size === '3br'
                                      ? '3 Bedroom Apartment\nThree bedrooms, large living area, full kitchen, two bathrooms, Wi-Fi, TV, workspace, balcony, and laundry facilities.'
                                      : room.size === 'penthouse'
                                        ? 'Penthouse Suite — Top floor, multiple bedrooms, luxury living space, gourmet kitchen, private terrace, panoramic views, Wi-Fi, smart TV, workspace, and premium amenities.'
                                        : room.size}
                            </span>
                            <span
                              className={
                                room.status === 'free' ? 'text-green-400 text-sm font-semibold' : 'text-red-400 text-sm font-semibold'
                              }
                            >
                              Status: {room.status === 'free' ? 'Available' : 'Reserved'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Reservation Options */}
      <div className="w-full max-w-3xl mt-10 mb-20 flex flex-col items-center gap-6 bg-gray-900 rounded-xl p-8 border border-gray-800 z-10">
        <h2 className="text-2xl font-bold text-orange-400 mb-2">Book Your Stay</h2>
        <p className="text-lg text-gray-200 mb-4 text-center">
          To reserve a room, please contact our manager directly:
        </p>
        <div className="flex flex-col gap-2 ">
          <span className="text-lg font-semibold text-orange-400">📞 Phone: <a href="tel:+420123456789" className="hover:underline text-orange-300">+420 123 456 789</a></span>
          <span className="text-lg font-semibold text-orange-400">📧 Email: <a href="mailto:booking@firehotel.com" className="hover:underline text-orange-300">booking@firehotel.com</a></span>
        </div>
      </div>
    </div>
  );
}

export default Search;
