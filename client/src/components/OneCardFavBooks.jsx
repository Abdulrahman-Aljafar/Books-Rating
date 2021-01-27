import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
//import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from "axios";


export default function OneCardBook(props) {
console.log(props.bimg)
  const [selectBook, setSelectBook] = useState(props.selectbook)
  const [book, setBook] = useState(selectBook);
  const [show, setShow] = useState(false);
 // const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const onChangeInput = ({ target: { name, value } }) => setBook({ ...book, [name]: value });
  
  const updateRating =(event, values) => {
    //event.preventDefault();
    let bookId = props.favBook._id;

    // edit book rating
         axios
        .post(`http://localhost:4000/api/books/addrating/${bookId}`, book)
        .then((res) => {

            console.log("res.data.user from profile update: ", res.data.user)
          



        }) .catch((err) => console.log(err));
};
    
    return ( <>
         
        <Col md="3" sm="4" className="mt-4 mr-5">
            <Card  className ="card-book">
                <Card.Img variant="top" src={props.favBook.bimg}  height ="300px" width="300px" style={{    margin :"auto" , objectFit :"cover"}}  />
                <Card.Body>
                    <Card.Title>{props.favBook.bname}</Card.Title>
                     
                     <Row >
                     <Col md={!props.delete? "12" : "5"}>
                     <Button variant="outline-secondary" onClick={
                         ()=> {
                            handleShow();
                        //  props.addBookIreadit(props.favBook._id) ;props.deleteBook(props.favBook._id);
                    } 
                     }className="outline-light" >
                          I read it</Button>
                    
                     </Col>
                     <Col md="3">
                    {props.delete && <Button variant="outline-danger"
                    onClick={()=> props.deleteBook(props.favBook._id)}
                     >delete </Button> } 
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Did you like the book?
                        <Form.Control
                                type="number"
                                placeholder=" enter number out of 10"
                                name="brate"
                                onChange={(e) => onChangeInput(e)}
                                 />
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" 
                            onClick={
                                    ()=> {
                                    updateRating();
                                    handleClose();
                                    props.addBookIreadit(props.favBook._id) ;
                                    props.deleteBook(props.favBook._id);
                                        } 
                                  }>
                                Save Changes
                            </Button>
                           
                    </Modal.Footer>
                </Modal>
                    
                    </Col>

                    
                 


                    </Row>
                </Card.Body>
            </Card>
        </Col>

       


        </>
    )
                    }