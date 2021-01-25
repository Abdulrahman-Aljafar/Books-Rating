import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import OneCardBook from "../components/OneCardBook"

import Axios from 'axios'

export default function MyBooks(props) {
    const [mybooks, setmybooks] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:4000/api/books/')
            .then(res => {
               // console.log(props.data._id)
               console.log(res.data)
                setmybooks(res.data.Books)
               
            })

    }, [])

    // Books[0].bname

    let allmybooks = mybooks.map((books, i) => {
        if(books.user == props.data._id )
            return (
                <OneCardBook img={books.bimg} bname={books.bname}/>
                
            )
    });
    return (
        <div>
            
            <Row className="justify-content-md-center">
            
            {allmybooks}
            </Row>
        </div>
    )
}
