import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
// import OneCardBook from "./components/OneCardBook";
import OneCardFavBooks from "../components/OneCardFavBooks"
import axios from 'axios'
import MyBooks from "./MyBooks";

export default function ToReadBook(props) {
  const { name, email, favoriteBooks1, _id } = props.auth.currentUser;
  const [favoriteBooks, setFavoriteBooks] = useState([]) // Contains all fave books form user

  useEffect(() => {
    axios.get('http://localhost:4000/api/books/')
      .then(res => {
        console.log(">>>>>>> props.user.favoriteBooks: ", props.user)
        const favoriteBooksBooks = res.data.Books.filter(book=> props.user.favoriteBooks.includes(book._id));
        setFavoriteBooks(favoriteBooksBooks)
      })

  }, [])

  const deleteBook = (bookId) => {
    let userId = _id
    axios.delete(`http://localhost:4000/api/books/${bookId}/${userId}`)
      .then(data => {
        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, favoriteBooks: data.data.Books.favoriteBooks } }))
        console.log(data)

      })
      // setFavoriteBooks(favoriteBooks)

  }

  let Myfavbooks = favoriteBooks.map((favBook, i) => {
        return (
          <OneCardFavBooks favBook={favBook} deleteBook={deleteBook} delete={true}/>    
        )
});
  return (
    <div>
            
    <Row className="justify-content-md-center">
    
    {Myfavbooks}
    </Row>
</div>
  )
}
