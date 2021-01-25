import React from 'react'
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
// import OneCardBook from "./components/OneCardBook";
import OneCardIreadit from "../components/OneCardIreadit"
import axios from 'axios'
import MyBooks from "./MyBooks";
import { Nav } from "react-bootstrap";

export default function IreadIt(props) {
  const { name, email, favoriteBooks1, _id } = props.auth.currentUser;



  
  const [favoriteBooks, setFavoriteBooks] = useState([]) // Contains all fave books form user
  // const [changeuseEffect, setChangeuseEffect] = useState(false)
  const getbook = async () => {
    let getUser = await axios.get(`http://localhost:4000/api/users/profile/${props.auth.currentUser._id}`)
    console.log('get profile', getUser)
    axios.get('http://localhost:4000/api/books/')
      .then(res => {
        console.log(">>>>>>> props.user.favoriteBooks: ", getUser.data.user.ireadit)
        const favoriteBooksBooks = res.data.filter(book => getUser.data.user.ireadit.includes(book._id));
        setFavoriteBooks(favoriteBooksBooks)
      })
  }
  useEffect(
    getbook

    , [])

  const deleteBook = (bookId) => {
    let userId = _id
    axios.delete(`http://localhost:4000/api/books/ireadit/${bookId}/${userId}`)
      .then(data => {
        const userData = localStorage.getItem("userData");
        // 1. update (userData), add fav, delete or whatever then 2. do the setItem
        // localStorage.setItem("userData", userData)
        const user = JSON.parse(userData);
        localStorage[_id] = JSON.stringify(data.data.ireadit)
        console.log(localStorage[_id])
        console.log('deleted book', data.data.ireadit)
        // setChangeuseEffect(!changeuseEffect)
        setFavoriteBooks(favoriteBooks.filter(book=>{
          return book._id != bookId
        }))
      })
  }

  let Myfavbooks = favoriteBooks.map((favBook, i) => {
    return (
      <OneCardIreadit favBook={favBook} deleteBook={deleteBook}  delete={true} />
    )
  });
  return (
    <div>
      <h1>i read</h1>
      {Myfavbooks}
    </div>
  )
}
