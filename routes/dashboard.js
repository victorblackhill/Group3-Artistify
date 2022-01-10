var express = require("express");
var router = express.Router();
const Artist = require("./../models/artists.model");

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

router.post("/artists/create", async function (req, res, next) {
  console.log(req.body);
  try {
    await Artist.create(req.body);
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

module.exports = router;
