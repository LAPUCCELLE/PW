import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
