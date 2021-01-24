import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import OneCardMovie from "./OneCardMovie";
import axios from 'axios'

export default function UserProfile(props) {
  const [alluserMovies, setAluserMovies] = useState([])
  const { name, email, favoriteMovies, _id } = props.auth.currentUser;
  console.log(favoriteMovies)
  useEffect(() => {
    axios.get('https://sei12.herokuapp.com/movei/json')
      .then(data => {
        // 
        let filtermovies = data.data.filter(movie => favoriteMovies.includes(movie._id))

        setAluserMovies(filtermovies)
      })

  }, [alluserMovies])

  const deleteMovei = (movieId) => {
    let userId = _id
    axios.delete(`http://localhost:5000/api/movies/${movieId}/${userId}`)
      .then(data => {
        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, favoriteMovies: data.data.favoriteMovies } }))
        console.log(data)

      })
      setAluserMovies(favoriteMovies)

  }

  const allfavoriteMovies = alluserMovies.map(movie => <OneCardMovie deleteMovei={deleteMovei} movie={movie} delete={true} />)
  return <> <h1> name :{name} </h1>
    <h1> email : {email} </h1>
    <h1> favorite Movies : </h1>

    <Container>
      <Row >
        {allfavoriteMovies}
      </Row>

    </Container>
  </>

}
