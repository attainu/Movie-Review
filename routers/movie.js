const express = require('express')
//const Review = require('../models/review')
//const auth = require('../middleware/auth')
const Movie = require('../models/movie')
const router = new express.Router()

router.get('/Allmovies', async (req, res) => {
    try {
      const movie = await Movie.find()
      res.json(movie)
    } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })


  router.get('/Findmovies', async (req, res) => {
    try {
    const findmovie = await Movie.find({ Name: { $regex: "t", $options: "i" } }, function(err, docs) {
      console.log("Partial Search Begins");
      console.log(docs);
      })
      res.json(findmovie)
    } catch (err) {
        res.status(500).json({ message: err.message })
      }
  });


module.exports = router


      /*
  Movie.find({ name: { $regex: "s", $options: "i" } }, function(err, docs) {
    console.log("Partial Search Begins");
    console.log(docs);
    });*/
