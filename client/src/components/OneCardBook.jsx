import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function OneCardBook(props) {
console.log(props.img)
    
    return ( <>
         
        <Col md="1" sm="4" className="mt-4 mr-5">
             
        <Card className='cardH' style={{ width: '11.1rem' , high:'11rem'}}>
                <Card.Img variant="top" src={props.book.bimg} style={{ width: '11rem', high:'10em' }} />
             
                <Card.Body>
                    <Card.Title>{props.bname}</Card.Title>
                     

                    <Row >
                     <Col md={!props.delete? "12" : "5"}>
                    
                    
                     </Col>


                    <Button className='btn1' variant="outline-danger"  onClick={()=> props.deleteBook(props.id)}>Delete</Button>
                 


                    </Row>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}