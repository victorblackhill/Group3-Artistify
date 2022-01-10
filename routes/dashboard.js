var express = require("express");
var router = express.Router();
const Artist = require("./../models/artists.model");
const uploader = require('./../config/cloudinary.config');
const multer = require('./../config/multer');
const Label = require("../models/labels.model");


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("dashboard.hbs");
});

router.get("/artists", function (req, res, next) {
  Artist.find()
    .then((dbresponse) => {
      res.render("artistList.hbs", {
        artists: dbresponse,
      });
    })
    .catch((e) => console.error(e));
});

// *** CREATE ***

router.get("/artists/create", function (req, res, next) {
  res.render("artistCreate.hbs");
});

router.post("/artists/create", uploader.single('picture'), async function (req, res, next) {
  console.log(req.file);
  try {
    await Artist.create({ name: req.body.name, isBand: req.body.isBand, description: req.body.description, picture: req.file.path });
    res.redirect("/dashboard/artists");
  } catch (e) {
    next(e);
  }
});

// *** DELETE ***
router.get("/artists/delete/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const deletedArtist = await Artist.findByIdAndRemove(id);
    console.log(deletedArtist);
    res.redirect("/dashboard/artists");
  } catch (e) {
    next(e);
  }
});

// *** UPDATE ***
router.get("/artists/update/:id", function (req, res, next) {
  Artist.findById(req.params.id)
    .then((dbresponse) => {
      res.render("artistUpdate.hbs", {
        artist: dbresponse,
      });
    })
    .catch((e) => next(e));
});

router.post("/artists/update/:id", async (req, res, next) => {
  try {
    await Artist.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/dashboard/artists");
  } catch (e) {
    next(e);
  }
});

/// *************** Labels routes *********************

router.get("/labels", (req, res, next) => {
  Label.find()
    .then((dbResponse) => {
      res.render('labels.hbs', {
        labels: dbResponse,
      })
    })
    .catch(e => console.error(e));
})

router.get("/labels/create", (req, res, next) => {
  res.render('labelCreate.hbs');
})

router.post("/labels/create", uploader.single('logo'), async (req, res, next) => {
  try {
    console.log(req.body);
    await Label.create({ name: req.body.name, city: req.body.city, country: req.body.country, street: req.body.street, streetNum: req.body.streetNum, zipcode: req.body.zipcode, logo: req.file.path });
    res.redirect('/dashboard/labels');
  } catch (e) {
    next(e);
  }
})


module.exports = router;


