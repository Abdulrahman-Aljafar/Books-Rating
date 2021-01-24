
const express = require('express');
const router = express.Router()
const Book = require("../models/books");
const User =require("../models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Book.find().then((Books)=>{
    
    res.json({ msg: "book ", Books: Books });
  })
});

router.post("/new", (req, res) => {
  const newBooks = {
    bname: req.body.bname,
    bAuthor: req.body.bAuthor,
    bimg:req.body.bimg,
    bdescription: req.body.bdescription,
    bcategory:req.body.bcategory,
    bReleasDate:req.body.bReleasDate,
    user:req.body.user,

  };



        Book.create(newBooks).then((Books) => {
          res.json({  Books: Books });
        })

      })


      






router.post("/toread", (req, res) => {

    let bookId = req.body.bookId
    let userId = req.body.userId
    console.log(bookId)

    User.findByIdAndUpdate(userId, { $addToSet: { favoriteBooks: bookId } }, { new: true })
        .then(user => {
            res.json({ msg: "the book im your list now, Enjoy reading it", favoriteBooks: user.favoriteBooks })

        })

})




router.delete('/:bookId/:userId', (req, res) => {

    let bookId = req.params.bookId
    let userId = req.params.userId

    User.findById(userId)
        .then(user => {
            let favoriteBooks = user.favoriteBooks.filter(book => {

                return !(book == bookId)
            })
            console.log(favoriteBooks.length)

            User.findByIdAndUpdate(userId, { favoriteBooks: favoriteBooks }, { new: true })
                .then(updateUser => {
                    res.json({ msg: "delete book from your list", favoriteBooks: updateUser.favoriteBooks })
                })
        })


})








module.exports = router;

