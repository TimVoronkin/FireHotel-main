import { Outlet, useLocation } from 'react-router';
import Logout from '../ui/Logout';
import { Link } from 'react-router';
import Footer from './Footer';
import useUserStore from '@/store/UserStore';


function DashboardLayout() {
  const name = useUserStore((state) => state.name);
  const surname = useUserStore((state) => state.surname);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const location = useLocation();

  // Определяем, какой фон показывать
  let bgImage = '';
  if (location.pathname.includes('/statistics')) {
    bgImage = '/public/bg-stats.png';
  } else if (location.pathname.includes('/users')) {
    bgImage = '/public/bg-user.png';
  } else if (location.pathname.includes('/lockers')) {
    bgImage = '/public/bg-hotel.png';
  } else if (location.pathname.includes('/cells')) {
    bgImage = '/public/bg-room.png';
  } else if (location.pathname.includes('/orders')) {
    bgImage = '/public/bg-key.png';
  }

  return (
    <div className="tw-bg-primary flex flex-col min-h-screen">
      {/* Фоновое изображение для dashboard */}
      {bgImage && (
        <img
          src={bgImage}
          alt="background"
          style={{
            position: 'fixed',
            top: '60%',
            left: '80%',
            width: '80%',
            minWidth: 320,
            maxWidth: 900,
            opacity: 0.5,
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
      )}
      <div className="w-full h-full flex-1 flex flex-col">
        <header className="py-4 w-full flex flex-wrap items-center justify-between bg-gray-900 px-10">
          <Link to="/" className="flex items-center gap-4 p-3">
            <img src="/fire-tree.svg" alt="FireHotel logo" className="w-12 h-12"/>
            <h1 className="text-3xl font-bold text-red-500">FireHotel</h1>
            <h1 className="text-3xl">Dashboard</h1>
          </Link>
          <nav className="flex items-center gap-4 p-3">
            <span className="text-lg text-white mr-4 flex flex-col text-right leading-tight">
              {/* {name && surname && (
                <> */}
                  <span>Hello, {name} {surname}!</span>
                  <span className="text-gray-400">{isAdmin ? '🛡️ admin' : '💼 worker'}</span>
                {/* </>
              )} */}
            </span>
            <Logout />
          </nav>
        </header>
        <main className="mt-20 pb-10 mx-20 relative z-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
