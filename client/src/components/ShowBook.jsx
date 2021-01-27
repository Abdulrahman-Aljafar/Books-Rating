import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import {useParams} from 'react-router-dom';
import API_URL from '../apiConfig.js'

function calcAvrg(array){
   if(!array) return 0 
    const sum = array.reduce((sum , num)=>{
     return sum + num  
    },0)
    if(array.length == 0 ) return 0 
    else return (sum/array.length)
    
}

export default function ShowBook(props) {
    const {id} = useParams()
    const selectBook = props.selectbook
 
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
                        <img width="100%" src={selectBook.bimg} alt="" srcset="" />
                    </Col>
                    <Col md="6">
                    <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Book Rateing : 
                        </span>
                      {calcAvrg(selectBook.brate)}
                        </p>


                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Book Name : 
                        </span>
                        {selectBook.bname}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Author : 
                        </span>
                        {selectBook.bAuthor}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                            Discription : 
                        </span>
                        {selectBook.bdescription}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Category : 
                        </span>
                        {selectBook.bcategory}
                        </p>

                        <p style={{fontSize:"25px" }}>
                         <span style={{fontWeight: "bold"
                        }}>
                           Realeas Date :
                        </span>
                        {selectBook.bReleasDate}
                        </p>

                        <Button onClick ={()=> addBookToIwantReadit()} variant="outline-secondary" > I want to read it </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}