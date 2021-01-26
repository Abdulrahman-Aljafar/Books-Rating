import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function OneCardBook(props) {
console.log(props.img)
    
    return ( <>
         
        <Col md="2" sm="4" >
        <Card className='cardH' style={{ width: '11.1rem' , high:'11rem'}}>
                <Card.Img variant="top" src={props.book.bimg} style={{ width: '11rem', high:'10em' }} />
                <Card.Body>
                    <Card.Title ><h6>{props.book.bname}</h6></Card.Title>
                     
                     <Row >
                     
                    
                    <Link to={`/Showbook/${props.book._id}`}> <Button className='btn1' variant="outline-secondary" onClick={()=>props.setSelectbook(props.book)}> more info</Button> </Link> 

                    </Row>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}