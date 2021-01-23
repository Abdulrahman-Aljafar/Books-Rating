const express = require('express');
const router = express.Router()
const Book = require("../models/books");

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
    bdescription: req.body.bdescription,
    bcategory:req.body.bcategory,
    bReleasDate:req.body.bReleasDate,
    user:req.body.user,

  };



        Book.create(newBooks).then((Books) => {
          res.json({ msg: "book insert successful", Books: Books });
        })

      })


      


module.exports = router;
