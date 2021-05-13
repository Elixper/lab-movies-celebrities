const express = require("express");
const router = express.Router();
const celebrityModel = require("./../models/celebrity.model");

// GET - all celebrities
router.get("/", (req, res, next) => {
  console.log("===>celebrities>>>");
  celebrityModel
    .find()
    .then((dbResult) => {
      res.render("celebrities/celebrities.hbs", { celebrities: dbResult });
    })
    .catch((dbErr) => next(dbErr));
});

// GET - Show a form to create a celebrity

router.get("/new", async (req, res, next) => {
  const celebrities = await celebrityModel.find();
  res.render("celebrities/new-celebrity.hbs", { celebrities });
});

// POST - create one celebrity
router.post("/create", (req, res, next) => {
  const NewCelebrity = { ...req.body };
  celebrityModel
    .create(NewCelebrity)
    .then((dbResult) => {
      res.redirect("/celebrities");
    })
    .catch((err) => res.redirect("/new"));
});

//GET  Update a celebrity
router.get("/celebrities/:id/edit", (req, res, next) => {
  celebrityModel
    .findById(req.params.id)
    .then((dbResult) => {
      res.render("celebrities/edit-celebrity.hbs", {
        celebrity: dbResult,
      });
    })
    .catch((dbErr) => next(dbErr));
});

//POST  Update a celebrity

router.post("/celebrities/:id/edit", (req, res, next) => {
  //celebrityModel findbyId and Update  // ... your code here
  console.log("--- req body => ------");
  console.log(req.body); // will contain the posted informations
  // it's an object : the keys are the names declared in the form
  celebrityModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((dbResult) => {
      res.redirect("/celebrities");
    })
    .catch((dbErr) => next(dbErr));
});

// GET - delete one artist
router.get("/delete/:id", (req, res, next) => {
  celebrityModel
    .findByIdAndDelete(req.params.id)
    .then((dbSuccess) => {
      res.redirect("/celebrities");
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});

module.exports = router;
