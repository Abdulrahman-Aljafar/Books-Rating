import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../apiConfig.js'
import { useParams } from 'react-router-dom';
    // props.setUserBook(values)
                // let userdetails = {
                //     bname: values.bname,
                //     bAuthor: values.bAuthor,
                //     bimg: values.bimg,
                //     bdescription: values.bdescription,
                //     bcategory: values.bcategory,
                //     bReleasDate: values.bReleasDate ,
                //     user:values.user
                // }
                //   setBook(userdetails)


export default function EditBook(props) {
    const { id } = useParams()
    const [selectBook, setSelectBook] = useState(props.selectbook)
    const history = useHistory();
    const [book, setBook] = useState(selectBook);



    useEffect(() => {
        setSelectBook(JSON.parse(localStorage.EditBook))
        setBook(JSON.parse(localStorage.EditBook))
    }, [])

    // to add the user info to database
    const onChangeInput = ({ target: { name, value } }) => setBook({ ...book, [name]: value });


    const onSubmit = (event, values) => {
        event.preventDefault();
        let bookId = selectBook._id;

        // edit book 
             axios
            .post(`http://localhost:4000/api/books/EditBook/${bookId}`, book)
            .then((res) => {
                
                console.log("res.data.user from profile update: ", res.data.user)
                history.push("/mybooks")



            }) .catch((err) => console.log(err));
    };
    
    return (
        <>
            { selectBook && <>

                <h1>book name : {selectBook.bname}</h1>

                <Form className="mt-5" onSubmit={(e)=> onSubmit(e)}>
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control
                                        placeholder="Book name"
                                        name="bname"
                                        defaultValue={selectBook.bname}
                                        onChange={(e) => onChangeInput(e)}
                                         />
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Discription</Form.Label>
                                        <Form.Control
                                            name="bdescription"
                                            defaultValue={selectBook.bdescription}
                                            onChange={(e) => onChangeInput(e)}
                                            as="textarea" rows={3}  />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Type of the book</Form.Label>
                                        <Form.Control
                                            value={selectBook.bcategory}
                                            onChange={(e) => onChangeInput(e)}
                                            as="select" name="bcategory" custom
                                            >

                                            <option>History</option>
                                            <option>Memoir</option>
                                            <option>Politics</option>
                                            <option>Cookbook</option>
                                            <option>Children’s Books</option>
                                            <option>Crime</option>
                                            <option>Art/architecture</option>
                                            <option>Biography</option>
                                            <option>Science</option>
                                            <option>Sports and leisure</option>
                                            <option>Horror</option>
                                            <option>Business/economics</option>
                                            <option>other</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Release Date</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        placeholder="Release Date"
                                        name="bReleasDate"
                                        defaultValue={selectBook.bReleasDate}
                                        onChange={(e) => onChangeInput(e)}
                                         />
                                </Form.Group>


                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control

                                        placeholder="Image"
                                        name="bimg"
                                        defaultValue={selectBook.bimg}
                                        onChange={(e) => onChangeInput(e)}
                                         />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Author Name</Form.Label>

                                    <Form.Control

                                        placeholder="Author Name"
                                        name="bAuthor"
                                        defaultValue={selectBook.bAuthor}
                                        onChange={(e) => onChangeInput(e)}
                                         />
                                </Form.Group>
                            </Form.Row>

                            {/* <Link to={`/Mybooks`}> </Link> */}
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg" block
                             
                            >
                                Save
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </>
            }


        </>

    )
}