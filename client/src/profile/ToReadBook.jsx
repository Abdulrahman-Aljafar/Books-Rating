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
  // const [changeuseEffect, setChangeuseEffect] = useState(false)

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
        const userData = localStorage.getItem("userData");
        const user = JSON.parse(userData);
        localStorage[_id] = JSON.stringify(data.data.favoriteBooks)
        console.log(localStorage[_id])
        // setChangeuseEffect(!changeuseEffect)
      })
      setFavoriteBooks(favoriteBooks)

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
