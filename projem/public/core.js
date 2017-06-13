var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();


router.get('/siparis', function(req, res, next) {
	  res.render('./siparis.html');
	});


router.get('/admin', function(req, res, next) {
	  res.render('./admin.html');
	});


router.get('/kayit', function(req, res, next) {
	  res.render('./kayit.html');
	});

/* GET home page. */
router.get('/anasayfa', function(req, res, next) {
  
	res.render('./anasayfa.html');

});

module.exports = router;








