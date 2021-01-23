import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button, Nav, Navbar ,Dropdown} from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
export default function NaveBar(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
       <img src="/img/logo.png "></img> BooksStream
      </Navbar.Brand>
      {!props.isLoggedIn ? 
      <>
      <Nav.Link as={Link} to="/login">LogIn</Nav.Link > </>
      :  
      <> 
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {(props.data.utype == "0") ? 
           <>
            <Nav> 
                <Nav.Link as={Link} to="/profile"> Edit Reader profile </Nav.Link>
                <Nav.Link as={Link} to="/profile"> To Read Books </Nav.Link>
            </Nav>
            </> : 
            <>
             <Nav> 
                <Nav.Link as={Link} to="/profile"> Edit Author profile </Nav.Link>
                <Nav.Link as={Link} to="/profile"> My Books </Nav.Link>
                <Nav.Link as={Link} to="/profile"> Add New Book </Nav.Link>
            </Nav>
            </>}
          <Nav>
          <Nav.Link
            onClick={() => {
              console.log("Logging Out!");
              localStorage.removeItem("jwtToken");
              props.loginCallback();
            }}
          >
            Logout
          </Nav.Link> 
        </Nav>
      </Navbar.Collapse>
      </> }
    </Navbar>
  );
}