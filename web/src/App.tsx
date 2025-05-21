import '@radix-ui/themes/styles.css';
// import { useQuery } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';
import Home from './components/Pages/Home/Home';
import RootLayout from './components/Layouts/RootLayout';
import { Theme } from '@radix-ui/themes';
import LockerAccessPage from './components/Pages/LockerAccessPage/LockerAccessPage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import useUserStore from './store/UserStore';
import Career from './components/Pages/Career/Career';
import Auth from './components/Pages/Auth/Auth';
import Employee from './components/Pages/Dashboard/Employee/Employee';
import AdminDashboard from './components/Pages/Dashboard/Admin/AdminDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { getLockers } from '@/api/lockers/lockers'; // Import the getLockers function
import DashboardLayout from './components/Layouts/DashboardLayout';
import Contacts from './components/Pages/Contacts/Contacts';
import Search from './components/Pages/Search/Search'; // Импорт компонента




function App() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="red" appearance="dark">
        {/* Public routes */}
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/locker" element={<LockerAccessPage />} />
            <Route path="/career" element={<Career />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/search" element={<Search />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {isAdmin ? (
                <>
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard/employee" element={<Employee />} />
                  <Route path="/dashboard/employee/*" element={<Employee />} />
                </>
              )}
            </Route>
          </Route>
        </Routes>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
