const express = require('express');
const app = require('../app');
const router = express.Router();
const Movie = require("../models/Movie.model")

router.use(express.static('public'))

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index', {style: "stylesheets/home.css"})
    
    
    });

router.get("/movies", (req, res, next)=> 
{
    Movie.find()
    .then(allMoviesFromDB => {
        res.render("movies-list" ,  
        {
            movies: allMoviesFromDB,
            style: "stylesheets/details.css"
        })
    })
    .catch(error => console.log("An error occurred while getting books from database: ", error))
});

router.get("/movies/:movieId", (req, res, next) =>
{
    Movie.findById(req.params.movieId)
    .then(movieFromDB =>{
        res.render("movies-detail", 
         {  movie: movieFromDB,
            style: "../stylesheets/list.css"
        })
    })
    .catch(error => console.log("An error occurred while getting books from database: ", error))
})

module.exports = router;
