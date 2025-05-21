import { Flex, TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router';

function WorkerNavigation() {
  const { pathname } = useLocation();
  return (
    <TabNav.Root>
      <Flex className="flex-row gap-10 w-full">
        <div className="flex flex-col w-fit gap-5 border-red-500 border-2 rounded-md p-5 text-center">
          <TabNav.Link asChild active={pathname.includes('/data-viewer/statistics')}>
            <Link to="/dashboard/worker/data-viewer/statistics">📊 Statistics</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname.includes('/data-viewer/users')}>
            <Link to="/dashboard/worker/data-viewer/users">👨‍💼 Users</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname.includes('/data-viewer/lockers')}>
            <Link to="/dashboard/worker/data-viewer/lockers">🏨 Branches</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname.includes('/data-viewer/cells')}>
            <Link to="/dashboard/worker/data-viewer/cells">🔐 Rooms</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname.includes('/data-viewer/orders')}>
            <Link to="/dashboard/worker/data-viewer/orders">📝 Orders</Link>
          </TabNav.Link>
        </div>
      </Flex>
    </TabNav.Root>
  );
}

export default WorkerNavigation;
