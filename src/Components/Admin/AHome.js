// AHome.jsx
import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaHouse } from "react-icons/fa6";



function AHome() {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

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
          <h1>2</h1>
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

      {/* <div className='admin-charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </main>
  );
}

export default AHome;
