import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import OneCardMovie from './OneCardMovie'
import Axios from 'axios'
// https://i.ibb.co/wdsJF41/32770.jpg

export default function Allmovies(props) {
    const [movies , setMovie11] = useState([])
    const [types , setTypes] = useState([])
    const [selectMovies , setSelectMovie] = useState([])


    useEffect(() => {
        Axios.get('https://sei12.herokuapp.com/movei/json')
        .then(res =>{     
            setMovie11(res.data)
            setSelectMovie(res.data) // select movies will take the first time all the movies ! 
            let typees = res.data.map(ele => ele.typee ) // add types base on the movies
            typees.unshift('All') // add the All select top of the selects 
            setTypes(Array.from(new Set(typees))) // to make the array uniqe and non duplicate the elements
        })
    }, [])

//  show the selected movie after the filter
   const  allmovies = selectMovies.map(movie =>{

     return <OneCardMovie movie= {movie} setSelectMovie= {props.setSelectMovie} />
   }) 

// to add the selects  type
let allSelect = types.map(ele => <option value={ele}>{ele}</option>)

// function to filtet the movie by the type 
const onChangeHandler = (e) =>{
    let value = e.target.value
    if (value == "All") { // if the select all show all the movies 
        setSelectMovie(movies)
    }else { // if not show only the movie type amd we use filter method ! 
        setSelectMovie(movies.filter(movie => movie.typee == value))
    }

}
    return (
        <div>
            <Container >
                <h1 className="mt-5" style={{ textAlign: "center" }}>All movies</h1>

                <Row className="justify-content-md-center" >
                    <Col md="4" >
                        <Form>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Type of the movie</Form.Label>
                                <Form.Control as="select" custom onChange ={onChangeHandler}>
                                {allSelect}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                {/* movies cards */}
                <Row className="justify-content-md-center">
                   
                    {allmovies}
                   
                </Row>

            </Container>
        </div>
    )
}
