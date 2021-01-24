import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import OneCardBookHome from "./OneCardBookHome"

import Axios from 'axios'

export default function Home(props) {
    const [selectbook, setSelectbook] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:4000/api/books/')
            .then(res => {
               // console.log(props.data._id)
               console.log(res.data)
               setSelectbook(res.data.Books)
               
            })

    }, [])

    // Books[0].bname

    let allmybooks = selectbook.map((book, i) => {
        
            return (
                <OneCardBookHome book= {book} setSelectbook= {props.setSelectbook}/>
                
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
