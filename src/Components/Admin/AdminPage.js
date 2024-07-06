// AdminPage.jsx
import React, { useState } from 'react';
import './AdminPage.css';
import Sidebar from './Sidebar';
import AHeader from './AHeader';
import AHome from './AHome';

function AdminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='admin-grid-container'>
      <AHeader toggleSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <AHome />
    </div>
  );
}

export default AdminPage;
