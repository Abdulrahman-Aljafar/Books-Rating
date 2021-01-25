import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button, Nav, Navbar, NavDropdown, Form, FormControl } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";


export default function NaveBar(props) {
  return (

    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/landing">bookStream</Navbar.Brand>

      <Nav.Link href="#home" as={Link} to="/Home" style={{color:"gray"}}>Home</Nav.Link>

      {/* <Nav.Link as={Link} to="/Home">Home</Nav.Link> */}
      {!props.isLoggedIn ?
        <>
          <Nav.Link as={Link} to="/login">LogIn</Nav.Link > </>
        :
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {props.data && (props.data.utype == "0") ?
              <>
                <Nav>

                  <NavDropdown title="Dropdown" id="basic-nav-dropdown1">
                    <NavDropdown.Item as={Link} to="/toread">I want to read it</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ireadit">i read it</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">edit profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/home" onClick={() => {
                      console.log("Logging Out!");
                      localStorage.removeItem("jwtToken");
                      props.loginCallback();
                    }}>logout</NavDropdown.Item>

                  </NavDropdown>
                </Nav>
              </> :
              <>
                <Nav>

                  <NavDropdown title="Dropdown2" id="basic-nav-dropdown2">
                    <NavDropdown.Item as={Link} to="/newbook">add new book</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mybooks">my books</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">edit profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/home" onClick={() => {
                      console.log("Logging Out!");
                      localStorage.removeItem("jwtToken");
                      props.loginCallback();
                    }}>logout</NavDropdown.Item>

                  </NavDropdown>
                
                </Nav>
              </>}
              </Navbar.Collapse>
              <Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success"
                >Search</Button>
              </Form>
              </Nav>
          
          
        </>}
      
    </Navbar>
  );
}