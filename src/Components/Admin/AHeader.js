// AHeader.jsx
import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function AHeader({ toggleSidebar }) {
  return (
    <header className='admin-header'>
      <div className='admin-menu-icon'>
        <BsJustify className='icon' onClick={toggleSidebar} />
      </div>
      <div className='admin-header-left'>
        {/* <BsSearch className='icon' /> */}
        Dream Homes
      </div>
      {/* <div className='admin-header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
      </div> */}
    </header>
  );
}

export default AHeader;
