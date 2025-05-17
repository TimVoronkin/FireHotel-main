// import { Link } from 'react-router';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 px-20 py-10 mt-20">
      <div className="border-b border-gray-700 flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="/fire-tree-white.svg" alt="FireHotel logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-white">FireHotel</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://facebook.com/timvoronkin" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/icon-fb.svg" alt="Facebook" className="w-7 h-7 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/tim-voronkin/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="/icon-in.svg" alt="Linkedin" className="w-7 h-7 hover:scale-110 transition-transform" />
          </a>
          <a href="https://instagram.com/timvoronkin" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/icon-ig.svg" alt="Instagram" className="w-7 h-7 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-5">
        &copy; {year} FireHotel by Tim Voronkin <br></br>All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
