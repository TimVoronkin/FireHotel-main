import { Link, useLocation } from 'react-router';
import { TabNav } from '@radix-ui/themes';

function Header() {
  const location = useLocation();

  return (
    <header
      className="py-4 w-full flex flex-wrap items-center justify-between px-10 border-b border-gray-700/40 shadow-lg bg-gray-900/60 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(24,24,27,0.60)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 10
      }}
    >
      <Link to="/" className="flex items-center gap-4 p-3">
        <img src="/fire-tree.svg" alt="FireHotel logo" className="w-12 h-12" />
        <h1 className="text-3xl font-bold text-red-500">FireHotel</h1>
      </Link>
      <nav className="flex items-center gap-4 p-3">
        <TabNav.Root size={'2'} color="red" className="flex flex-col gap-5 md:flex-row">
          <TabNav.Link active={location.pathname === '/'}>
            <Link to="/" className="text-xl">
              Home
            </Link>
          </TabNav.Link>
          <TabNav.Link active={location.pathname === '/search'}>
            <Link to="/search" className="text-xl">
              Search
            </Link>
          </TabNav.Link>
                    <TabNav.Link active={location.pathname === '/career'}>
            <Link to="/career" className="text-xl">
              Careers
            </Link>
          </TabNav.Link>
          <TabNav.Link active={location.pathname === '/auth'}>
            <Link to="/auth" className="text-xl">
              For Employers
            </Link>
          </TabNav.Link>
          <TabNav.Link active={location.pathname === '/contacts'}>
            <Link to="/contacts" className="text-xl">
              Contact
            </Link>
          </TabNav.Link>
        </TabNav.Root>
      </nav>
    </header>
  );
}

export default Header;
