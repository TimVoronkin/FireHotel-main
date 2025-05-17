import { Button } from '@radix-ui/themes';
// import React from 'react';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center p-10">
      <section>
        <h1 className="text-4xl font-bold text-red-500 underline">Welcome to Firebox Parcel Lockers!</h1>
        <p className="text-2xl  leading-relaxed mt-10">
          <span className="text-3xl">
            <span className="font-bold text-[#FF7F6A]">Convenient</span> <span className="font-bold text-green-400">Secure</span>{' '}
            <span className="font-bold text-yellow-400">Anytime</span>
          </span>
          <br />
          With Firebox, your parcels are always within reach.
          <br />
          Our 24/7 self-service lockers make it easy to pick up your packages whenever it suits you—no queues, no waiting, and no hassle.
          <br />
          <span className="font-bold">Your delivery, your schedule</span>.<br />
          Ready to collect your parcel?
        </p>
        <div>
          <Button style={{ cursor: 'pointer' }} variant="outline" size={'4'} mt={'5'} onClick={() => navigate('/locker')}>
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
