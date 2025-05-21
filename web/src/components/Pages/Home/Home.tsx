// import { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../ui/carousel';

const testimonials = [
	{
		name: 'Jana Nováková',
		text: 'fireHotel is the best place to relax! Spacious rooms, excellent service, and a stunning city view.',
		image: '/person-1.jpg',
	},
	{
		name: 'Petr Dvořák',
		text: 'I loved the pool and gym. The staff is always ready to help. Highly recommended!',
		image: '/person-2.jpg',
	},
	{
		name: 'Lucie Svobodová',
		text: 'Breakfasts are amazing, and the location is perfect — right in the city center. Thank you, fireHotel!',
		image: '/person-3.jpg',
	},
  {
    name: 'Tomáš Horák',
    text: 'I had a great business trip at fireHotel. The conference room was well-equipped, and the staff was very professional.',
    image: '/person-4.jpg',
  },
  {
    name: 'Eva Černá',
    text: 'fireHotel is my favorite place to stay when I visit the city. The atmosphere is cozy, and the service is top-notch.',
    image: '/person-5.jpg',
  },
];

function Home() {
	const navigate = useNavigate();
	return (
		<div className="h-full flex flex-col items-center p-0 min-h-screen gap-10">
			{/* Hero Carousel */}
			<section className="w-full max-w-6xl mx-auto mt-0 mb-12">
        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] rounded-none overflow-hidden shadow-2xl flex items-center justify-center h-[600px]">
          <img src="/room-4.jpg" alt="Room 4" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center h-full">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg text-center mb-4">FireHotel</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-300 text-center">Experience comfort, style, and unforgettable moments</h2>
          </div>
        </div>
			</section>

			{/* Main Info */}
			<section className="w-full max-w-6xl flex flex-col md:flex-row gap-10 items-center justify-between mb-16">
        <div className="flex-1 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
          <h2 className="text-4xl font-bold text-orange-400 mb-6">Welcome to FireHotel!</h2>
          <p className="text-2xl leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-orange-400">FireHotel</span> is a modern hotel chain offering the perfect blend of luxury, comfort, and convenience for both leisure and business travelers.<br />
            Enjoy breathtaking city views, world-class service, and a variety of amenities designed to make your stay truly special.
          </p>
          <p className="text-xl text-gray-300 mb-6">
            Discover our signature restaurant, relax in the spa, or take a dip in our panoramic pool. Whether you are here for work or pleasure, fireHotel is your home away from home.
          </p>
          <Button
            style={{ cursor: 'pointer' }}
            variant="solid"
            size={'4'}
            mt={'5'}
            onClick={() => navigate('/search')}
          >
            Book a Room
          </Button>
        </div>
      </section>
      {/* Features & Gallery */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
        <div className="flex flex-col gap-6 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
          <h3 className="text-3xl font-bold text-orange-400 mb-2">Why Choose fireHotel?</h3>
          <ul className="list-disc ml-6 mt-2 text-lg text-gray-200">
            <li>Spacious and cozy rooms with modern design</li>
            <li>Free Wi-Fi and 24/7 guest support</li>
            <li>Signature restaurant and panoramic bar</li>
            <li>Fitness center, swimming pool, and SPA zone</li>
            <li>Conference halls for business events</li>
            <li>Prime locations in city centers and scenic areas</li>
            <li>Flexible booking and exclusive offers</li>
            <li>Personalized service and guest privacy</li>
          </ul>
        </div>
        <div className="flex flex-col gap-6 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
          <h3 className="text-3xl font-bold text-orange-400 mb-2">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img src="/hotel-1.jpg" alt="Hotel Exterior 1" className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-gray-800" />
            <img src="/hotel-2.jpg" alt="Hotel Exterior 2" className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-gray-800" />
            <img src="/room-1.jpg" alt="Room 1" className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-gray-800" />
            <img src="/room-2.jpg" alt="Room 2" className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-gray-800" />
          </div>
        </div>
      </section>
      {/* User Reviews */}
      <section className="w-full max-w-3xl mt-8 mb-16">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">Guest Reviews</h2>
        <div className="relative">
          <Carousel>
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex flex-col items-center p-6 bg-gray-900/60 backdrop-blur-md rounded-xl shadow-md mx-2 border border-gray-800" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full mb-4 border-2 border-orange-400"
                    />
                    <p className="text-lg italic mb-2 text-gray-200">“{t.text}”</p>
                    <span className="font-semibold text-orange-400">{t.name}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
		</div>
	);
}

export default Home;
