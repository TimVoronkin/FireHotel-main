import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PositionCard from '@/components/ui/PositionCard';
import { Flex } from '@radix-ui/themes';

function Career() {
  const pos = [
    {
      title: 'Frontend Developer',
      description: 'Frontend Developer',
      image: 'https://placehold.co/150',
    },
    {
      title: 'Backend Developer',
      description: 'Backend Developer',
      image: 'https://placehold.co/150',
    },
    {
      title: 'Fullstack Developer',
      description: 'Fullstack Developer',
      image: 'https://placehold.co/150',
    },
    {
      title: 'Frontend Developer',
      description: 'Frontend Developer',
      image: 'https://placehold.co/150',
    },
    {
      title: 'Backend Developer',
      description: 'Backend Developer',
      image: 'https://placehold.co/150',
    },
    {
      title: 'Fullstack Developer',
      description: 'Fullstack Developer',
      image: 'https://placehold.co/150',
    },
  ];
  return (
    <section className="flex flex-col gap-20">
      <Flex className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold text-red-500">Join the FireBox Team</h1>
        <p className="text-pretty text-xl w-1/2">
          At Firebox, we’re revolutionizing the way people receive and manage their deliveries. Our 24/7 parcel locker network is built on
          innovation, convenience, and exceptional customer service. But none of this would be possible without our dedicated team of
          professionals who bring our vision to life every day.
        </p>
      </Flex>
      <Flex className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold text-red-500">Why Work With Us?</h1>
        <ul className="text-pretty text-xl w-1/2 list-disc">
          <li>
            <span className="text-red-500 font-bold">Innovation at the Core</span>: We thrive on pushing boundaries and finding creative
            solutions to everyday challenges in the logistics industry.
          </li>
          <li>
            <span className="text-red-500 font-bold">Grow Your Career</span>: At Firebox, your growth is our priority. We offer career
            advancement opportunities, ongoing training, and the chance to work with cutting-edge technology.
          </li>
          <li>
            <span className="text-red-500 font-bold">Collaborative Culture</span>: Join a team that values communication, collaboration, and
            mutual respect. We believe the best ideas come from diverse perspectives.
          </li>
        </ul>
      </Flex>
      <Flex className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold text-red-500">Our Values</h1>
        <ul className="text-pretty text-xl w-1/2 list-decimal">
          <li>
            <span className="text-red-500 font-bold">Customer First</span>: We are committed to making parcel delivery and pickup simple and
            stress-free for our users.
          </li>
          <li>
            <span className="text-red-500 font-bold">Continuous Improvement</span>: We never stop learning, adapting, and improving.
          </li>
          <li>
            <span className="text-red-500 font-bold">Teamwork</span>: Together, we achieve more.
          </li>
        </ul>
      </Flex>
      <Flex className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold text-red-500">Open Positions</h1>
        <Carousel orientation="horizontal">
          <CarouselContent className="max-w-[800px] -ml-4 ">
            {pos.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <PositionCard title={item.title} description={item.description} image={item.image} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Flex>
    </section>
  );
}

export default Career;
