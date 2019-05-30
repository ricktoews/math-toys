var express = require('express');
var router = express.Router();
var endpoints = require('../api-handlers/endpoints');
//var mastermind = require('../helpers/mastermind');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dc', endpoints.dc);
router.get('/dc/:denom', endpoints.dc);

router.get('/phi', endpoints.phi);
router.get('/phi/:rows', endpoints.phi);

router.get('/mastermind', function(req, res, next) {
  res.render('mastermind', { title: 'Mastermind' });
});


module.exports = router;
