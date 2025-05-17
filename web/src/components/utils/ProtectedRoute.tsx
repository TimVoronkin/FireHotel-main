import useUserStore from '@/store/UserStore';
// import React from 'react';
import { Outlet } from 'react-router';

function ProtectedRoute() {
  const isAuth = useUserStore((state) => state.isAuth);
  return <>{isAuth ? <Outlet /> : null}</>;
}

export default ProtectedRoute;
