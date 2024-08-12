import React from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { FaHouse } from "react-icons/fa6";

function AHome({ propertyCount }) {  // Accept propertyCount as a prop
  return (
    <main className='admin-main-container'>
      <div className='admin-main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='admin-main-cards'>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>Properties</h3>
            <FaHouse className='card-icon' />
          </div>
          <p>{propertyCount}</p>  {/* Display propertyCount */}
        </div>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card-icon' />
          </div>
          <h1>1</h1>
        </div>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card-icon' />
          </div>
          <h1>10</h1>
        </div>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card-icon' />
          </div>
          <h1>10</h1>
        </div>
      </div>
    </main>
  );
}

export default AHome;
