import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import {useParams} from 'react-router-dom';
export default function ShowBook(props) {
    const {id} = useParams()
    const [selectBook , setSelectBook]= useState(props.selectbook)
    const {bname  , bAuthor, bimg, bdescription, bcategory,bReleasDate  } = selectBook
    useEffect(() => {
            if (!bname) {
                axios.get('http://localhost:4000/api/books/')
                .then(res =>{     
                    let book = res.data.find(ele => ele._id == id)
                    setSelectBook(book)
                })
            }
    }, [])
    const addBookToIwantReadit = () =>{
        console.log("bookId = " , selectBook._id)
    console.log("userId = " ,props.user._id )
    axios.post('http://localhost:4000/api/books/toread' , {bookId :selectBook._id ,  userId :props.user._id  })
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
                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Book Name : 
                        </span>
                        {bname}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Author : 
                        </span>
                        {bAuthor}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Discription : 
                        </span>
                        {bdescription}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Category : 
                        </span>
                        {bcategory}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Realeas Date :
                        </span>
                        {bReleasDate}
                        </p>

                        <Button onClick ={()=> addBookToIwantReadit()} variant="outline-secondary" > I want to read it </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}