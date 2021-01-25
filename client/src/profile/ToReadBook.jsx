import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
// import OneCardBook from "./components/OneCardBook";
import OneCardFavBooks from "../components/OneCardFavBooks"
import axios from 'axios'
import MyBooks from "./MyBooks";
import { Nav } from "react-bootstrap";

export default function ToReadBook(props) {
  const { name, email, favoriteBooks1, _id } = props.auth.currentUser;
  const [favoriteBooks, setFavoriteBooks] = useState([]) // Contains all fave books form user
  // const [changeuseEffect, setChangeuseEffect] = useState(false)
  const getbook = async () => {
    let getUser = await axios.get(`http://localhost:4000/api/users/profile/${props.auth.currentUser._id}`)
    console.log('get profile', getUser)
    axios.get('http://localhost:4000/api/books/')
      .then(res => {
        console.log(">>>>>>> props.user.favoriteBooks: ", getUser.data.user.favoriteBooks)
        const favoriteBooksBooks = res.data.filter(book => getUser.data.user.favoriteBooks.includes(book._id));
        setFavoriteBooks(favoriteBooksBooks)
      })
  }
  useEffect(
    getbook

    , [])

  const deleteBook = (bookId) => {
    let userId = _id
    axios.delete(`http://localhost:4000/api/books/${bookId}/${userId}`)
      .then(data => {
        const userData = localStorage.getItem("userData");
        // 1. update (userData), add fav, delete or whatever then 2. do the setItem
        // localStorage.setItem("userData", userData)
        const user = JSON.parse(userData);
        localStorage[_id] = JSON.stringify(data.data.favoriteBooks)
        console.log(localStorage[_id])
        console.log('deleted book', data.data.favoriteBooks)
        // setChangeuseEffect(!changeuseEffect)
        setFavoriteBooks(favoriteBooks.filter(book=>{
          return book._id != bookId
        }))
      })
  }

  const addBookIreadit = (a) => {



    console.log("bookId = ", a)
    console.log("userId = ", props.user._id)
    axios.post('http://localhost:4000/api/books/ireadit', { bookId: a, userId: props.user._id })
      .then(data => {

        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, ireadit: data.data.ireadit } }))
        console.log(data)
      })

  }

  let Myfavbooks = favoriteBooks.map((favBook, i) => {
    return (
      <OneCardFavBooks favBook={favBook} deleteBook={deleteBook} addBookIreadit={addBookIreadit} delete={true} />
    )
  });
  return (
    <div>
      <Nav
        className="justify-content-center"
        activeKey="/toread"
        // onSelect={onChangeHandler}
      >
        <Nav.Item>
          <Nav.Link eventKey="toread" href="/toread"><h4>To Read Books</h4></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="iread"><h4>Books I Read it  </h4></Nav.Link>
        </Nav.Item>
      </Nav>

      <Row className="justify-content-md-center">

        {Myfavbooks}
      </Row>
    </div>
  )
}
