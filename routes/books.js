const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.post("/toread", (req, res) => {

    let bookId = req.body.bookId
    let userId = req.body.userId
    console.log(bookId)

    User.findByIdAndUpdate(userId, { $addToSet: { favoriteBooks: bookId } }, { new: true })
        .then(user => {
            res.json({ msg: "the book im your list now, Enjoy reading it", favoriteBooks: user.favoriteBooks })

        })

})

router.post("/readit", (req, res) => {

    let bookId = req.body.bookId
    let userId = req.body.userId
    console.log(bookId)

    User.findByIdAndUpdate(userId, { $addToReadit: { readIt: bookId } }, { new: true })
        .then(user => {
            res.json({ msg: "the book im your list now, Enjoy reading it", readIt: user.readIt })

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