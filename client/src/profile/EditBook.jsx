import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert , Image } from "react-bootstrap";
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../apiConfig.js'
import {useParams} from 'react-router-dom';
export default function EditBook(props) {
    const {id} = useParams()
    const [selectBook , setSelectBook]= useState(props.selectbook)
    const history = useHistory();
    const [book, setBook] = useState(selectBook); 
    useEffect(() => {
        if (!selectBook) {
            axios.get(`${API_URL}/api/books/`)
            .then(res =>{     
                let book1 = res.data.find(ele => ele._id == id)
                setSelectBook(book1)
                setBook(book1)
            })

        }

}, [])
    
    // to add the user info to database
    const onChangeInput = ({ target: { name, value } }) => {
        
        setBook({ ...book, [name]: value });  
 
        
    };
    console.log("bokkkkkk jfhkgjhkjgfhgdfh", book)
    console.log("select bookk ",{selectBook})
    const onSubmit = (event , values) => {
        event.preventDefault();
        console.log("book subbmiitted ")
        let bookId = selectBook._id;
      console.log("book Id " , bookId)
        axios
            .post(`http://localhost:4000/api/books/EditBook/${bookId}`, book)
            .then((res) => {
                console.log("res.data.user from profile update: ", res.data.user)
               // props.setUserBook(values)
                let userdetails = {
                    bname: values.bname,
                    bAuthor: values.bAuthor,
                    bimg: values.bimg,
                    bdescription: values.bdescription,
                    bcategory: values.bcategory,
                    bReleasDate: values.bReleasDate ,
                    user:values.user
                }
                  setBook(userdetails)
                })
                .catch((err) => console.log(err));
    };
    //console.log("id bookkk " , selectBook._id )
    return (
 <>
    { selectBook && <>
         
        <h1>book name : {selectBook.bname}</h1>

         <Form className="mt-5">
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
                             required/>
                         </Col>
                         <Col md={12}>
                             <Form.Group controlId="exampleForm.ControlTextarea1">
                                 <Form.Label>Discription</Form.Label>
                                 <Form.Control
                                     name="bdescription"
                                     defaultValue={selectBook.bdescription}
                                    onChange={(e) => onChangeInput(e)}
                                     as="textarea" rows={3} required/>
                             </Form.Group>
                         </Col>
                         <Col md={12}>
                             <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Type of the book</Form.Label>
                                 <Form.Control 
                                value={selectBook.bcategory}
                                 onChange={(e) => onChangeInput(e)} 
                                 as="select" name="bcategory" custom
                                 required>
                                     
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
                                 required/>
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
                                 required/>
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
                                 required/>
                         </Form.Group>
                     </Form.Row>

         <Button variant="primary" type="submit" size="lg" block 
         onClick={(e) => onSubmit(e)}
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