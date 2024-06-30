import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './CustomNavbar.css';
import logo from "../logo.png";

function CustomNavbar() {
  return (
    <Container className='nav-container'>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/Header" className="navbar-brand">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Nav className="ml-auto">
            {/* <Nav.Link href="/Adminlogin">Admin</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}
export default CustomNavbar;
