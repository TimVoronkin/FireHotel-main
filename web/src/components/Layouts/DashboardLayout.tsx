import { Outlet, useLocation } from 'react-router';
import Logout from '../ui/Logout';
import { Link } from 'react-router';
import Footer from './Footer';
import useUserStore from '@/store/UserStore';

function stringToColor(str: string) {
  // Преобразуем строку в число
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Получаем цветовой тон (0-359)
  const hue = Math.abs(hash) % 360;
  // Темный цвет с оттенком
  return `hsl(${hue}, 40%, 28%)`;
}

function getInitials(name: string, surname: string) {
  return `${name?.[0] ?? ''}${surname?.[0] ?? ''}`.toUpperCase();
}

function DashboardLayout() {
  const name = useUserStore((state) => state.name);
  const surname = useUserStore((state) => state.surname);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const location = useLocation();
  const initials = getInitials(name, surname);
  const avatarColor = stringToColor(name + surname);

  // Определяем, какой фон показывать
  let bgImage = '';
  if (location.pathname.includes('/statistics')) {
    bgImage = '/bg-stats.png';
  } else if (location.pathname.includes('/users')) {
    bgImage = '/bg-user.png';
  } else if (location.pathname.includes('/lockers')) {
    bgImage = '/bg-hotel.png';
  } else if (location.pathname.includes('/cells')) {
    bgImage = '/bg-room.png';
  } else if (location.pathname.includes('/orders')) {
    bgImage = '/bg-key.png';
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
            <img src="/fire-tree.svg" alt="FireHotel logo" className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-red-500">FireHotel</h1>
            <h1 className="text-3xl">Dashboard</h1>
          </Link>
          <nav className="flex items-center gap-4 p-3">
            <div className="text-lg text-white mr-4 flex flex-col text-right leading-tight gap-2">
              <span>
                Hello, {name} {surname} !
              </span>
              <div className="flex flex-row items-center mt-1 w-full">
                <div className="flex-1 flex justify-start">
                  <Logout />
                </div>
                <div className="flex-1 flex justify-end">
                  <span className="text-gray-400">
                    {isAdmin ? 'admin 🛡️' : 'worker 💼 '}
                  </span>
                </div>
              </div>
            </div>
            {/* Аватарка с инициалами */}
            <span
              style={{
                background: avatarColor,
                color: '#fff',
                width: 70,
                height: 70,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 300,
                fontSize: 24,
                letterSpacing: 1,
                userSelect: 'none',
              }}
              title={`${name} ${surname}`}
            >
              {initials}
            </span>
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
