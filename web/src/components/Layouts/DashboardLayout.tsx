import { Outlet } from 'react-router';
import Logout from '../ui/Logout';
import { Link } from 'react-router';
import Footer from './Footer';
import useUserStore from '@/store/UserStore';


function DashboardLayout() {
  const name = useUserStore((state) => state.name);
  const surname = useUserStore((state) => state.surname);
  const isAdmin = useUserStore((state) => state.isAdmin);
  return (
    <div className="tw-bg-primary flex flex-col min-h-screen">
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
        <main className="mt-20 pb-10 mx-20">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
