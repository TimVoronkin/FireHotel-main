import { Outlet } from 'react-router';
import Logout from '../ui/Logout';
import { Link } from 'react-router';
import Footer from './Footer';


function DashboardLayout() {
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
