import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import {useParams} from 'react-router-dom';


export default function ShowBook(props) {
    const {id} = useParams()
    const [selectBook , setSelectBook]= useState(props.selectBook)
    const {bname  , bAuthor, bimg, bdescription, bcategory,bReleasDate  } = selectBook
    useEffect(() => {
            if (!bname) {
                axios.get('https://sei12.herokuapp.com/book/json')
                .then(res =>{     
                    let book = res.data.find(ele => ele._id == id)
                    setSelectBook(book)
                })

            }
    
    }, [])


    const addBookToIwantReadit = () =>{


        
        console.log("bookId = " , selectBook._id)
    console.log("userId = " ,props.user._id )
    axios.post('http://localhost:5000/api/toread' , {bookId :selectBook._id ,  userId :props.user._id  })
    .then(data =>{

        props.setAuth(pre =>({...pre , currentUser : {...pre.currentUser , favoriteBooks : data.data.favoriteBooks }}))
        console.log(data)
    })

}



    return (
        <>
            <Container className="mt-5" >
                <Row >
                    <Col md="6" >
                        <img width="100%" src={bimg} alt="" srcset="" />
                    </Col>
                    <Col md="6">
                        <h2>{bname}</h2>
                        <h2> {bAuthor}</h2>
                        <p>{bdescription}</p>
                        <h2>{bcategory}</h2>
                        <h2>{bReleasDate}</h2>

                        <Button onClick ={()=> addBookToIwantReadit()} className="outline-light" > I want to read it </Button>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
