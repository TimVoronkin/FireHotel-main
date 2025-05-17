import { Flex } from '@radix-ui/themes';
import OrdersList from './Orders/OrdersList';
import Statistics from './Statistics/Statistics';
import UsersList from './Users/UsersList';
import { UseQueryResult } from '@tanstack/react-query';
import { User } from '@/types/users';
import { Order } from '@/types/orders';
import { Locker } from '@/types/lockers';
import { Cell } from '@/types/cells';
import CellsList from './Cells/CellsList';
import LockerList from './Lockers/LockerList';

function DataViewer({
  pathname,
  users,
  orders,
  lockers,
  cells,
}: {
  pathname: string;
  users: UseQueryResult<User[]>;
  orders: UseQueryResult<Order[]>;
  lockers: UseQueryResult<Locker[]>;
  cells: UseQueryResult<Cell[]>;
}) {
  return (
    <Flex className="p-5 w-fit h-fit">
      {pathname.includes('/data-viewer/statistics') && (
        <Statistics
          users={users.data!}
          orders={orders.data!}
          lockers={lockers.data!}
          isLoading={users.isLoading || orders.isLoading || lockers.isLoading}
        />
      )}
      {pathname.includes('/data-viewer/users') && <UsersList users={users.data!} isLoading={users.isLoading}/>}
      {pathname.includes('/data-viewer/orders') && <OrdersList orders={orders.data!} isLoading={orders.isLoading} />}
      {pathname.includes('/data-viewer/cells') && <CellsList cells={cells.data!} isLoading={cells.isLoading} />}
      {pathname.includes('/data-viewer/lockers') && <LockerList lockers={lockers.data!} cells={cells.data!} isLoading={lockers.isLoading} />}
    </Flex>
  );
}

export default DataViewer;
