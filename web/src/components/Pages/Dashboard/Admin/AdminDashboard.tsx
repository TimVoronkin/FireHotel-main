import { Flex } from '@radix-ui/themes';
import AdminNavigation from './components/AdminNavigation';
function AdminDashboard() {
  return (
    <Flex as="div" className="flex-col  gap-5">
      <AdminNavigation />
    </Flex>
  );
}

export default AdminDashboard;
