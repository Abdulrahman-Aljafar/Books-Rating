import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function Singup(props) {
  const history = useHistory();

  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart

  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  // to add the user info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/users/register", user)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/login");
        } else {
          setTimeout(() => {
            setRegister(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}
      <Form className="mt-5">
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Form.Row>
              <Col md={6}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  name="name"
                  onChange={(e) => onChangeInput(e)}
                />
              </Col>

              
            </Form.Row>
            
            <Form.Row >
              <Col md={6}>
              <Form.Group  controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => onChangeInput(e)}
                />
                
              </Form.Group>
              </Col>
            


            </Form.Row>
            <Form.Row>
            <Col md={6}>
            <Form.Group  controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
              </Col>
              </Form.Row>


       <Form.Check inline label="Reader" type="radio"  name="utype" id="Reader" value="0" onChange={(e) => onChangeInput(e)} />
      <Form.Check inline label="Auther"  type="radio"  name="utype" id="Auther" value="1" onChange={(e) => onChangeInput(e)}/> 

<br/>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>

            <p>u alredy have account ?  <a href="/login"> log in</a></p> 
            
          </Col>
        </Row>
      </Form>
    </>
  );
}