import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          <Topbar />
          <div className="p-6">
            <Outlet/>
            <div />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
