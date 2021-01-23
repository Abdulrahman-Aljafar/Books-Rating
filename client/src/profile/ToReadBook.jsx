import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import OneCardBook from "./components/OneCardBook";
import axios from 'axios'

export default function ToReadBook(props) {
  const [alluserBooks, setAlluserBooks] = useState([])
  const { bimg, favoriteBooks, _id } = props.auth.currentUser;
  console.log(favoriteBooks)


  useEffect(() => {
    axios.get('http://localhost:5000/api/user/toread')
      .then(data => {
        // 
        let filterbooks = data.data.filter(read => favoriteBooks.includes(read._id))

        setAlluserBooks(filterbooks)
      })

  }, [alluserBooks])

  const deleteBook = (bookId) => {
    let userId = _id
    axios.delete(`http://localhost:5000/api/home/${bookId}/${userId}`)
      .then(data => {
        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, favoriteBooks: data.data.favoriteBooks } }))
        console.log(data)

      })
      setAlluserBooks(favoriteBooks)

  }

  const alltoRead = alluserBooks.map(read => <OneCardBook deleteBook={deleteBook} read={read} delete={true} />)


  const addBookToReadit = () =>{


        
    console.log("bookId = " , selectBook._id)
console.log("userId = " ,props.user._id )
axios.post('http://localhost:5000/api/readit' , {bookId :selectBook._id ,  userId :props.user._id  })
.then(data =>{

    props.setAuth(pre =>({...pre , currentUser : {...pre.currentUser , favoriteBooks : data.data.favoriteBooks }}))
    console.log(data)
})

}
const alltoRead = alluserBooks.map(read => <OneCardBook addBookToReadit={addBookToReadit} read={read} post={true} />)


  return <> 

<img src={bimg} /> 
   <Container>
      <Row >
        {alltoRead}
      </Row>

    </Container>
  </>

}
