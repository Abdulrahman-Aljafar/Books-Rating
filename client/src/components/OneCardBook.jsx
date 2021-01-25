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
                    
                    
                     </Col>


                    <Button variant="danger"  onClick={()=> props.deleteBook(props.id)}>Danger</Button>
                 


                    </Row>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}
