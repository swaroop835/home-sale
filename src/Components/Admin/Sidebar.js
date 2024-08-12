// Sidebar.jsx
import React from "react";
import {
  
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  
} from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { CgBorderStyleDashed } from "react-icons/cg";

function Sidebar({ openSidebarToggle, toggleSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "admin-sidebar-responsive" : ""}
    >
      <div className="admin-sidebar-title">
        <div className="admin-sidebar-brand">Admin Dashboard</div>
        <span className="icon close-icon" onClick={toggleSidebar}>
          X
        </span>
      </div>

      <ul className="admin-sidebar-list">
        
        <li className="admin-sidebar-list-item">
          <a href="/PropertyTable">
            <FaHouse className="icon" />
            Properties
          </a>
        </li>
<<<<<<< HEAD
       
=======
        {/* <li className="admin-sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li> */}
>>>>>>> 0a62f07448226c919e3e8ed808f4f15268ac5446
        <li className="admin-sidebar-list-item">
          <a href="/Userlisting">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="admin-sidebar-list-item">
          <a href="/AddProperty">
            <BsListCheck className="icon" />
            Add Property
          </a>
        </li>
        <li className="admin-sidebar-list-item">
          <a href="/Feedbacklist">
            <BsMenuButtonWideFill className="icon" />
            Feedback
          </a>
        </li>
        <li className="admin-sidebar-list-item">
          <a href="/Order">
            <CgBorderStyleDashed className="icon" />
            Orders
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
