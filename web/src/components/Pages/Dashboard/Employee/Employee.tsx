import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users/users';
import { getOrders } from '@/api/orders/orders';
import { getLockers } from '@/api/lockers/lockers';
import { getCells } from '@/api/cells/cells';
import EmployeeDataViewer from './components/EmployeeDataViewer';
import EmployeeNavigation from './components/EmployeeNavigation';
import { useLocation } from 'react-router';

function Employee() {
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

  // For now, always show all tables (like admin, but with limited actions)
  return (
    <section className="flex flex-col items-center">
      <div>
        <h1 className="text-[40px] font-bold">Hi, Employee</h1>
      </div>
      <EmployeeNavigation />
      <article className="mt-8 w-full">
        <EmployeeDataViewer
          pathname={pathname}
          users={users}
          orders={orders}
          lockers={lockers}
          cells={cells}
        />
      </article>
    </section>
  );
}

export default Employee;
