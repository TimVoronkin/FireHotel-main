// import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <div className="tw-bg-primary flex flex-col min-h-screen">
      <Header />
      <main className="mt-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
