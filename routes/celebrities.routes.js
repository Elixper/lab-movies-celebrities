const express = require("express");
const router = express.Router();
const celebrityModel = require("./../models/celebrity.model");


// GET - all celebrities
router.get("/", async (req, res, next) => {
  try {
    res.render("celebrities/celebrities.hbs", { celebrities: await celebrityModel.find() });
  } catch (err) {
    next(err);
  }
});

// GET - Show a form to create a celebrity

router.get("/new", async (req, res, next) => {
  const celebrities=await celebrityModel.find();
  res.render("celebrities/new-celebrity.hbs",{celebrities});
});

// POST - create one celebrity
router.post("/create", (req, res, next) => {
  const NewCelebrity={...req.body}
  celebrityModel.create(NewCelebrity)
    .then((dbResult) => {
      res.redirect("/celebrities");
    })
    .catch(next)
  
});

//GET  Update a celebrity
router.get("/celebrities/:id/edit", (req, res, next) => {
  celebrityModel.findById(req.params.id)
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
  console.log('--- req body => ------');
  console.log(req.body); // will contain the posted informations
  // it's an object : the keys are the names declared in the form
  celebrityModel.findByIdAndUpdate(req.params.id, req.body)
    .then((dbResult) => {
      res.redirect("/celebrities");
    })
    .catch((dbError) => next(dbError));
});


// GET - delete one artist
router.get("/delete/:id", async (req, res, next) => {
  try {
    await celebrityModel.findByIdAndDelete(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
