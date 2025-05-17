import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

function Contacts() {
  const [apiKey, setApiKey] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/api/config')
      .then((response) => response.json())
      .then((data) => setApiKey(data.googleMapsApiKey))
      .catch((error) => console.error('Error fetching API key:', error));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold text-red-500 underline">Contact FireHotel Management System</h1>

      <section className="flex flex-col md:flex-row gap-10">
        <p className="text-2xl leading-relaxed">
          <span className="text-3xl font-bold text-[#FF7F6A]">Main Office</span>
          <br />
          Location: Prague, Czech Republic
          <br />
          Contact Person: <span className="font-bold">Tim Voronkin</span>
          <br />
          Email:{' '}
          <a href="mailto:voronkintim@gmail.com" className="text-[#FF7F6A] underline">
            voronkintim@gmail.com
          </a>
          <br />
          Phone: +420 123 456 789
        </p>
        <div className="rounded-lg overflow-hidden">
          {apiKey && (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
              &q=Florenc+Hotel+Prague+CZ`}
            ></iframe>
          )}
        </div>
      </section>
      <div>
        <Button
          style={{ cursor: 'pointer' }}
          variant="outline"
          size={'4'}
          mt={'5'}
          onClick={() => (window.location.href = 'mailto:voronkintim@gmail.com')}
        >
          Write us an email
        </Button>
      </div>
    </div>
  );
}

export default Contacts;
