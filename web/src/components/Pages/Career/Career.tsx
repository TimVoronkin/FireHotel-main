import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Flex } from '@radix-ui/themes';
import { useEffect, useRef } from 'react';

const positions = [
	{
		title: 'Frontend Developer',
		description:
			'Develop beautiful and user-friendly interfaces for our guests and staff. React/TypeScript experience required.',
		image: '/person-1.jpg',
	},
	{
		title: 'Backend Developer',
		description:
			'Build robust APIs and services for hotel management and guest experience. Node.js/NestJS experience preferred.',
		image: '/person-2.jpg',
	},
	{
		title: 'Receptionist',
		description:
			'Be the face of FireHotel! Welcome guests, assist with check-in/check-out, and provide excellent service.',
		image: '/person-3.jpg',
	},
	{
		title: 'Housekeeper',
		description:
			'Maintain the cleanliness and comfort of our rooms and public areas. Attention to detail and reliability are a must.',
		image: '/person-4.jpg',
	},
	{
		title: 'Branch Staff',
		description:
			'Assist guests, manage bookings, and support daily hotel operations at our various locations.',
		image: '/hotel-2.jpg',
	},
  {
    title: 'Marketing Specialist',
    description:
      'Help us promote FireHotel and reach new guests through creative marketing strategies and campaigns.',
    image: '/hotel-1.jpg',
  },
  {
    title: 'IT Support',
    description:
      'Provide technical support to our staff and ensure smooth operation of hotel systems and technology.',
    image: '/hotel-3.jpg',
  },
];

function Career() {
	const carouselRef = useRef<any>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (carouselRef.current && carouselRef.current.next) {
				carouselRef.current.next();
			}
		}, 3500);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="flex flex-col gap-20 mt-20 flex-1">
			<Flex className="flex flex-col  items-center gap-5 ">
				<div className="w-full md:w-2/3 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
					<h1 className="text-4xl font-bold text-orange-400">Join the FireHotel Team</h1>
					<p className="text-pretty text-xl text-gray-200 text-center mt-4">
						FireHotel is growing! We are looking for talented and passionate people to join our team and help us deliver the
						the best hotel experience for our guests. Whether you are a developer, a hospitality professional, or just starting
						your career, we have a place for you.
					</p>
				</div>
			</Flex>
			<Flex className="flex flex-col justify-center items-center gap-5">
				<div className="w-full md:w-2/3 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
					<h2 className="text-3xl font-bold text-orange-400">Who We Need</h2>
					<ul className="text-pretty text-xl list-disc text-gray-200 mt-4 ml-6">
						<li><span className="text-orange-400 font-bold">Frontend Developers</span>: Create modern, responsive web interfaces for our guests and staff.</li>
						<li><span className="text-orange-400 font-bold">Backend Developers</span>: Build and maintain our hotel management systems and APIs.</li>
						<li><span className="text-orange-400 font-bold">Receptionists</span>: Welcome guests and provide outstanding service at the front desk.</li>
						<li><span className="text-orange-400 font-bold">Housekeepers</span>: Ensure our rooms and facilities are always clean and comfortable.</li>
						<li><span className="text-orange-400 font-bold">Branch Staff</span>: Support daily operations and guest needs at our hotel locations.</li>
					</ul>
				</div>
			</Flex>
			<Flex className="flex flex-col justify-center items-center gap-5">
				<div className="w-full md:w-2/3 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
					<h2 className="text-3xl font-bold text-orange-400">Why Work at FireHotel?</h2>
					<ul className="text-pretty text-xl list-disc text-gray-200 mt-4 ml-6">
						<li><span className="text-orange-400 font-bold">Modern Environment</span>: Work in stylish hotels with the latest technology.</li>
						<li><span className="text-orange-400 font-bold">Career Growth</span>: We support your professional development and offer opportunities to advance.</li>
						<li><span className="text-orange-400 font-bold">Team Spirit</span>: Join a friendly, supportive, and diverse team.</li>
						<li><span className="text-orange-400 font-bold">Competitive Benefits</span>: Enjoy attractive pay, bonuses, and staff discounts.</li>
					</ul>
				</div>
			</Flex>
					<h2 className="text-3xl font-bold text-orange-400 text-center">Open Positions</h2>
					<div className="flex justify-center w-full">
						<Carousel orientation="horizontal" className="w-full max-w-4xl" ref={carouselRef}>
							<CarouselContent className="w-full flex items-center justify-center">
								{positions.map((item, index) => (
									<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
										<div className="bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 border border-gray-800">
											<img
												src={item.image}
												alt={item.title}
												className="w-28 h-28 rounded-full object-cover border-2 border-orange-400"
											/>
											<h3 className="text-xl font-bold text-orange-400">{item.title}</h3>
											<p className="text-gray-200 text-center">{item.description}</p>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
			<Flex className="flex flex-col justify-center items-center gap-5 mt-10">
				<div className="w-full md:w-2/3 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg p-8" style={{backgroundColor: 'rgba(24,24,27,0.60)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(16px)'}}>
          <h2 className="text-2xl font-bold text-orange-400 text-center">Ready to join us?</h2>
					<p className="text-lg text-gray-200 text-center mt-10">
						Send your CV and a short cover letter to{' '}
						<a
							href="mailto:hr@firehotel.com"
							className="text-orange-400 underline"
						>
							hr@firehotel.com
						</a>{' '}
						or visit any of our branches to apply in person.
					</p>
				</div>
			</Flex>
		</section>
	);
}

export default Career;
