import { Locker } from '@/types/lockers';
import { Order } from '@/types/orders';
import { User } from '@/types/users';
import { Box } from '@radix-ui/themes';

function Statistics({ users, orders, lockers, isLoading }: { users: User[]; orders: Order[]; lockers: Locker[]; isLoading: boolean }) {
  return (
    <Box className="flex flex-col gap-10">
      <span>
        <h1 className="text-xl font-bold text-red-500">Statistics</h1>
      </span>
      <span className="flex flex-col gap-5 mt-5">
        <span className="flex flex-col gap-1 ">
        <p>Total users: <b>{isLoading ? 'Loading...' : users?.length || 0}</b></p>
        <p className="ml-5">Admin users: <b>{isLoading ? 'Loading...' : users?.filter((user) => user.role === 'admin').length || 0}</b></p>
        <p className="ml-5">Worker users: <b>{isLoading ? 'Loading...' : users?.filter((user) => user.role === 'worker').length || 0}</b></p>
        </span>
        <p>Total branches: <b>{isLoading ? 'Loading...' : lockers?.length || 0}</b></p>
        <p>Total orders: <b>{isLoading ? 'Loading...' : orders?.length || 0}</b></p>
      </span>

    </Box>
  );
}

export default Statistics;
