import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function OneCardBook(props) {
console.log(props.img)
    
    return ( <>
         
        <Col md="2" sm="4" className="mt-4 mr-5">
            <Card  className ="card-book">
                <Card.Img variant="top" src={props.book.bimg}  height ="200px" width="1px" style={{    margin :"auto" , objectFit :"cover"}}  />
                <Card.Body>
                    <Card.Title>{props.book.bname}</Card.Title>
                     
                     <Row >
                     
                    
                    <Link to={`/Showbook/${props.book._id}`}> <Button onClick={()=>props.setSelectbook(props.book)}> more info</Button> </Link> 
                    


                 


                    </Row>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}
