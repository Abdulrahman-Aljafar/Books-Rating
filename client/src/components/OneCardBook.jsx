import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function OneCardBook(props) {
console.log(props.img)
    
    return ( <>
         
        <Col md="2" sm="4" className="mt-4 mr-5">
            <Card  className ="card-book">
                <Card.Img variant="top" src={props.img}  height ="300px" width="1px" style={{    margin :"auto" , objectFit :"cover"}}  />
                <Card.Body>
                    <Card.Title>{props.bname}</Card.Title>
                     
                     <Row >
                     <Col md={!props.delete? "12" : "5"}>
                    
                    {/* <Link to={`/books/${props.book._id}`}> <Button onClick={()=>props.addBookToReadit(props.book)}> i read it</Button> </Link>  */}
                    </Col>


                    <Col md="3">
                    {props.delete && <Button 
                    onClick={()=> props.deleteBook(props.book._id)}
                    className="btn-danger" >delete </Button> }
                    </Col>


                    </Row>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}
