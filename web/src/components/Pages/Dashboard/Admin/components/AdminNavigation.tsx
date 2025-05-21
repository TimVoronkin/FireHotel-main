import { Flex, TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router';
import { getLockers } from '@/api/lockers/lockers';
import { getOrders } from '@/api/orders/orders';
import { getUsers } from '@/api/users/users';
import { useQuery } from '@tanstack/react-query';
import DataViewer from './DataViewer';
import { getCells } from '@/api/cells/cells';
import Administration from './Administration';
// import CaretDown from '@/icons/CaretDown';
// import { useState } from 'react';
// import CaretUp from '@/icons/CaretUp';

function AdminNavigation() {
  // const [dataViewerIsOpen, setDataViewerIsOpen] = useState(true);
  // const [administrationIsOpen, setAdministrationIsOpen] = useState(true);
  const { pathname } = useLocation();

  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    cacheTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
  const orders = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    cacheTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
  const lockers = useQuery({
    queryKey: ['lockers'],
    queryFn: () => getLockers(),
    cacheTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
  const cells = useQuery({
    queryKey: ['cells'],
    queryFn: () => getCells(),
    cacheTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
  return (
    <TabNav.Root>
      <Flex className="flex-row gap-10 w-full">
        <Flex className="flex-col items-center gap-5">
          {/* <span className="flex items-center gap-2" onClick={() => setDataViewerIsOpen(!dataViewerIsOpen)}>
            <h1 className="text-xl font-bold text-red-500">Data Viewer</h1>
            {dataViewerIsOpen ? <CaretDown className="text-red-500" /> : <CaretUp />}
          </span> */}
          {/* {dataViewerIsOpen && ( */}
          <div className="flex flex-col w-fit gap-5 border-red-500 border-2 rounded-md p-5 text-center  ">
            <TabNav.Link asChild active={pathname.includes('/data-viewer/statistics')}>
              <Link to="/dashboard/admin/data-viewer/statistics">📊 Statistics</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname.includes('/data-viewer/users')}>
              <Link to="/dashboard/admin/data-viewer/users">👨‍💼 Users</Link>
            </TabNav.Link>

            <TabNav.Link asChild active={pathname.includes('/data-viewer/lockers')}>
              <Link to="/dashboard/admin/data-viewer/lockers">🏨 Branches</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname.includes('/data-viewer/cells')}>
              <Link to="/dashboard/admin/data-viewer/cells">🔐 Rooms</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname.includes('/data-viewer/orders')}>
              <Link to="/dashboard/admin/data-viewer/orders">📝 Orders</Link>
            </TabNav.Link>
          </div>
          {/* )} */}
          {/* Administration */}
          {/* <Flex className="flex-col items-center text-center gap-2">
            <span className="flex items-center gap-2" onClick={() => setAdministrationIsOpen(!administrationIsOpen)}>
              <h1 className="text-xl font-bold text-red-500">Administration</h1>
              {administrationIsOpen ? <CaretDown /> : <CaretUp />}
            </span>
            {administrationIsOpen && (
              <div className="flex flex-col w-fit gap-5 border-red-500 border-2 rounded-md p-5 text-center  ">
                <TabNav.Link asChild active={pathname.includes('/manage/users')}>
                  <Link to="/dashboard/admin/manage/users">Users</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname.includes('/manage/lockers')}>
                  <Link to="/dashboard/admin/manage/lockers">Lockers</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname.includes('/manage/cells')}>
                  <Link to="/dashboard/admin/manage/cells">Cells</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname.includes('/manage/orders')}>
                  <Link to="/dashboard/admin/manage/orders">Orders</Link>
                </TabNav.Link>
              </div>
            )}
          </Flex> */}
        </Flex>
        <div className="ml-10">
          {pathname.includes('/data-viewer') && (
            <DataViewer pathname={pathname} users={users} orders={orders} lockers={lockers} cells={cells} />
          )}
          {pathname.includes('/manage') && <Administration pathname={pathname} />}
        </div>
      </Flex>
    </TabNav.Root>
  );
}

export default AdminNavigation;
