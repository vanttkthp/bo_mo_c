import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import {  signOut } from "firebase/auth";
import {auth} from './firebase';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">BOMOC</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
        <Nav className="me-auto">
          <Nav>
            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              
            </Offcanvas.Body>
          </Offcanvas>
          <NavDropdown title="Management" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to={`/books`}>
              Book
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`/mobiles`}>Mobile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`/clothes/list`}>
              Clothes
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`/vouchers/list`}>
              Voucher
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="You" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/user/profile/:id">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Your Orders</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          {/* <Nav.Link href="/">Your profile</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
