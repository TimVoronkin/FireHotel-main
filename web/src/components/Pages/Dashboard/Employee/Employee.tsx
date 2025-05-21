// import { useQuery } from '@tanstack/react-query';
// import { getUsers } from '@/api/users/users';
// import { getOrders } from '@/api/orders/orders';
// import { getLockers } from '@/api/lockers/lockers';
// import { getCells } from '@/api/cells/cells';
// import WorkerDataViewer from './components/EmployeeDataViewer';
// import WorkerNavigation from './components/EmployeeNavigation';
// import { useLocation } from 'react-router';

// function Worker() {
//   const { pathname } = useLocation();
//   const users = useQuery({
//     queryKey: ['users'],
//     queryFn: () => getUsers(),
//     cacheTime: 1000 * 60,
//     staleTime: 1000 * 60,
//     refetchInterval: 1000 * 60,
//   });
//   const orders = useQuery({
//     queryKey: ['orders'],
//     queryFn: () => getOrders(),
//     cacheTime: 1000 * 60,
//     staleTime: 1000 * 60,
//     refetchInterval: 1000 * 60,
//   });
//   const lockers = useQuery({
//     queryKey: ['lockers'],
//     queryFn: () => getLockers(),
//     cacheTime: 1000 * 60,
//     staleTime: 1000 * 60,
//     refetchInterval: 1000 * 60,
//   });
//   const cells = useQuery({
//     queryKey: ['cells'],
//     queryFn: () => getCells(),
//     cacheTime: 1000 * 60,
//     staleTime: 1000 * 60,
//     refetchInterval: 1000 * 60,
//   });

//   // For now, always show all tables (like admin, but with limited actions)
//   return (
//     <div className="flex flex-row h-full min-h-screen">
//       <aside className="w-64 bg-gray-900/60 p-5 border-r border-gray-700">
//         <WorkerNavigation />
//       </aside>
//       <main className="flex-1 p-10">
//         <h1 className="text-[40px] font-bold mb-8">Hi, Worker</h1>
//         <WorkerDataViewer
//           pathname={pathname}
//           users={users}
//           orders={orders}
//           lockers={lockers}
//           cells={cells}
//         />
//       </main>
//     </div>
//   );
// }

// export default Worker;

// // Удалить этот файл, так как теперь используется только Worker.tsx
