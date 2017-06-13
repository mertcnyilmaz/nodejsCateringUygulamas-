var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongodb=require("mongodb");
var mongoclient=mongodb.MongoClient;

var core=require('./public/core');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

var port=3000;

app.listen(port,function(err,res){
	if(err)
		console.log('server error');
	else
		console.log('server started');
});


app.get("/kullanicilar",function(req,res){
	
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
		var users=db.collection("users");
		
		//users.remove({});
		//users.insert({"admin":"true","yetkiliAdi":"Mertcan Yilmaz","firmaAdi":"KocSistem","telNo":"34523523453","kullanici":"mertcan","sifre":"123456"});
		//users.insert({"admin":"false","yetkiliAdi":"Yigit Yilmaz","firmaAdi":"KocSistem","telNo":"3452352568758","kullanici":"yigit","sifre":"123456"});
		users.find({}).toArray(function(err,result){
			res.send(result);
		});
	});
});


app.get("/gorevlistele",function(req,res){
	
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
		var gorevler=db.collection("siparisler");
		gorevler.find({}).toArray(function(err,result){
			res.send(result);
		});
	});
});

app.get("/menulistele",function(req,res){
	
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
		var gunlukMenu=db.collection("menuler");
		gunlukMenu.find({}).toArray(function(err,result){
			res.send(result);
		});
	});
});




app.post("/menu",function(req,res){
    
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
	var menuler=db.collection("menuler");
	var menum = req.body;
	menuler.insert(menum);
    res.send("menu kayit oldu.");
	});
});

app.post("/siparis",function(req,res){
    
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
	var siparisler=db.collection("siparisler");
	var siparisim = req.body;
	siparisler.insert(siparisim);
    res.send("siparisiniz kayit altina alinmistir.");
	});
});


app.post("/kayitlarim",function(req,res){
    
	mongoclient.connect("mongodb://127.0.0.1:27017/kullanicilar",function(err,db){
	var kullanicilar=db.collection("users");
	var kayitlarim = req.body;
	kullanicilar.insert(kayitlarim);
    res.send("Aramıza hoşgeldiniz!");
	});
	
});



router.get('/anasayfa', function(req, res, next) {
  res.render('./anasayfa.html');
});

router.get('/admin', function(req, res, next) {
  res.render('./admin.html');
});

router.get('/siparis', function(req, res, next) {
  res.render('./siparis.html');
});

router.get('/kayit', function(req, res, next) {
  res.render('./kayit.html');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/anasayfa', core);
app.use('/admin', core);
app.use('/siparis', core);
app.use('/kayit', core);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  
});



module.exports = app;
