import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert , Image } from "react-bootstrap";
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

 

const validtionSchima = Yup.object({
    name: Yup.string()
             .required('Name is required'),
    email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    password: Yup.string(),
    confirmPassword: Yup.string().test('passwords-match', 'Passwords must match ', function(value) {
        return this.parent.password === value;
      }),
    img: Yup.string().required("This Field is Required")
    
  })

export default function EditProfile(props) {
    const history = useHistory();
    const [profile, setProfile] = useState({});     

 
    const getProfileinfo = async () => {
    let getUser =  await axios.get(`http://localhost:4000/api/users/profile/${props.auth.currentUser._id}`)
    console.log('get profile', getUser)
    console.log(' profile name ',getUser.data.user.name)
    setProfile(getUser.data.user)
  } 
  console.log("prooofffiillee iinngg " + profile.name)
 useEffect(
    getProfileinfo 
    , [])


    const user=
        {
            
            name: props.userProfile.name,
            email:props.userProfile.email,
            password: '',
            confirmPassword: "",
            img: props.userProfile.img
        }
        
    // to add the user info to database
    const onSubmit = (values) => {
        let userId = props.userProfile._id
        axios
            .post(`http://localhost:4000/api/users/EditProfile/${userId}`, values)
            .then((res) => {
                  console.log("res.data.user from profile update: ", res.data.user)
                  props.setUserProfile(res.data.user)
                  setProfile(values)
                })
                .catch((err) => console.log(err));
    };
  

   
    return (
        <>
        <h1>Edit Profile Page </h1>
        <Formik
                initialValues={user} // Takes precedence on all other values
                validationSchema={validtionSchima}
                onSubmit={(values) => onSubmit(values)}
           >
           <FormikForm  className="mt-5">
                <Row className="justify-content-center mt-5">
                    <Col md={8} >
                    <Form.Row>
                            
                            <Col  md={4} >
                                <Image 
                                width={171}
                                height={180}
                                name="img"
                                src={profile.img }
                                roundedCircle />
                                </Col>
                                <Col md={6}>
                                  <Form.Label>
                                      <h2>{profile.name }</h2>
                                 </Form.Label> 
                                 <Form.Label>{profile.email }</Form.Label>
                                 </Col>
                        </Form.Row>
                        <Form.Row>
                        
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                   as={Field}
                                    type="Text"
                                    name="name" // this name will be given to you in the "values" variable in onSubmit(values)                                    
                                />
                                <ErrorMessage name="name" render={(msg) =>  <Alert variant={"danger"}>
                                    {msg}
                                </Alert>} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                as={Field}
                                    type="Text" 
                                    name="email"
                                />
                                <ErrorMessage name="email" render={(msg) =>  <Alert variant={"danger"}>
                                    {msg}
                                </Alert>} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Password </Form.Label>
                                <Form.Control
                                as={Field}
                                    type="Password" 
                                    name="password"
                                />
                                 <ErrorMessage name="password" render={(msg) =>  <Alert variant={"danger"}>
                                    {msg}
                                </Alert>} />
                            </Form.Group>
                        </Form.Row>  
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Confirm Password </Form.Label>
                                <Form.Control
                                as={Field}
                                    type="text" 
                                    name="confirmPassword"
                                />
                                 <ErrorMessage name="confirmPassword" render={(msg) =>  <Alert variant={"danger"}>
                                    {msg}
                                </Alert>} />
                            </Form.Group>
                        </Form.Row>  
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    as={Field}
                                    name="img"
                                />
                                <ErrorMessage name="img" render={(msg) =>  <Alert variant={"danger"}>
                                    {msg}
                                </Alert>} />
                            </Form.Group>
                        </Form.Row>
                     <Button 
                            variant="primary" 
                            size="lg" block 
                            type="submit"
                            >Save
                     </Button>
                    </Col>
                </Row>
          </FormikForm>
      </Formik>
 </>
    );
}