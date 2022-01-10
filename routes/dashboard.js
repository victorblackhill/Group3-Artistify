var express = require('express');
var router = express.Router();
const Artist = require('./../models/artists.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('dashboard.hbs');
});

router.get('/artists', function (req, res, next) {
  Artist.find()
    .then(dbresponse => {
      res.render('artistList.hbs', {
        artists: dbresponse
      })
    }).catch(e => console.error(e))
})

router.get('/artists/create', function (req, res, next) {
  res.render('artistCreate.hbs')
})

router.post('/artists/create', async function (req, res, next) {
  console.log(req.body);
  try {
    await Artist.create(req.body)
    res.redirect('/dashboard/artists')
  } catch (e) {
    next(e)
  }
})

module.exports = router;
