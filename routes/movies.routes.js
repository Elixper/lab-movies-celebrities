const express = require("express");
const router = express.Router();
const MovieModel = require("./../models/movie.model");
const celebrityModel= require("./../models/celebrity.model");

// GET - all celebrities
router.get("/", async (req, res, next) => {
    try {
      res.render("movies/movies.hbs", { movies: await MovieModel.find() });
    } catch (err) {
      next(err);
    }
  });

  //GET Create a new movie
router.get("/create", async function (req, res, next) {
    try {
      await res.render("movies/new-movie.hbs");
    } catch {
      next(err);
    }
  });

    //POST Create a new movie
  router.post("/create", (req, res, next) => {
    const NewMovie = req.body;
    console.log(req.body);
    MovieModel.create(NewMovie)
      .then((dbResult) => {
        res.redirect("/movies");
      })
      .catch(next);
  });
  
  //Iteration 4: Update a movie
  router.get("/movies/:id/edit", (req, res, next) => {
    MovieModel.findById(req.params.id)
      .then((dbResult) => {
        res.render("movies/edit-movie.hbs", {
          movie: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.post("/movies/:id/edit", (req, res, next) => {
    //movieModel findbyId and Update  // ... your code here
    console.log('--- req body => ------');
    console.log(req.body); // will contain the posted informations
    // it's an object : the keys are the names declared in the form
    MovieModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbResult) => {
        res.redirect("/movies");
      })
      .catch((dbError) => next(dbError));
  });
  
  //Iteration 5: Delete a given movie
  router.get("/movies/:id/delete", (req, res, next) => {
    movieModel.findByIdAndDelete(req.params.id)
    .then((dbSuccess) => {
      res.redirect("/movies");
    })
    .catch((dbErr) => {
      next(dbErr);
    });
  });
  
  module.exports = router;