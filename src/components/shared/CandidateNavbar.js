
import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap'
import './Navbar.css'

export default function CandidateNavbar() {
    return(
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="light" fixed="top" >
    {/* <Navbar.Brand href="#">JOB BOARD</Navbar.Brand> */}
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/" className="navtext">HOME</Nav.Link>
        <Nav.Link href="/about" className="navtext">ABOUT US</Nav.Link>
        <Nav.Link href="/contact" className="navtext">CONTACT US</Nav.Link>
      </Nav>
      <Nav>        
        <Nav.Link href="/users/login" className="navtext">LOGIN</Nav.Link>
        <Nav.Link href="/users/register" className="navtext">REGISTER</Nav.Link>
        <Nav.Link href="/users/dashboard" className="navtext">DASHBOARD</Nav.Link>
        <Nav.Link href="/users/login" className="navtext">LOGOUT</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
    );
}