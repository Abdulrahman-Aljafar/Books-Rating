import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import OneCardBookHome from "./OneCardBookHome"
import API_URL from '../apiConfig.js'
import Axios from 'axios'
import { Nav } from 'react-bootstrap'

export default function Home(props) {
    const [selectbook, setSelectbook] = useState([])
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        Axios.get(`${API_URL}/api/books/`)
            .then(res => {
                // console.log(props.data._id)
                console.log(res.data)
                setSelectbook(res.data)

            })

    }, [])
    const onChangeHandler = (e) => {
        setFilter(e.target.value);
    }

    // Books[0].bname



    let allmybooks;

    if (filter === 'All') {
        allmybooks = selectbook.map((book, i) => {
            return <OneCardBookHome book={book} setSelectbook={props.setSelectbook} />
        });
    }
    else {
        allmybooks = selectbook.map((book, i) => {
            if (book.bcategory === filter)
                return <OneCardBookHome book={book} setSelectbook={props.setSelectbook} />
        });
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Type of the movie</Form.Label>
                    <Form.Control onChange={onChangeHandler} as="select" custom>
                        <option>All</option>
                        <option>History</option>
                        <option>Memoir</option>
                        <option>Politics</option>
                        <option>Cookbook</option>
                        <option>Children’s Books</option>
                        <option>Crime</option>
                        <option>Art/architecture</option>
                        <option>Biography</option>
                        <option>Science</option>
                        <option>Sports and leisure</option>
                        <option>Horror</option>
                        <option>Business/economics</option>
                        <option>other</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <div className='padding'>
                <Row className="justify-content-md-center">
                    {allmybooks}
                </Row>
            </div>
        </div>
    )
}