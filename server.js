const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose =require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const container = require('./container');

container.resolve(function (users) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://chatapp:ma9443237@ds123129.mlab.com:23129/testdata');
    const app = SetupExpress();
    function SetupExpress() {
       const app = express();
       const server = http.createServer(app);
       server.listen(3000,function () {
           console.log("listening on port 3000")
       });
        ConfigExpress(app);
   const router = require('express-promise-router')();
   users.SetRouting(router);
   app.use(router);
   }


  function ConfigExpress(app){
       require('./passport/passport-local');
      
      app.use(express.static('public'));
      app.use(cookieParser());
      app.set('view engine','ejs');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(validator());
      app.use(session({
          secret: 'socketiochantapp',
          resave: true,
          saveInitialized: true,
//          saveUninitialized: true,
          stoer: new MongoStore({mongooseConnection: mongoose.connection})
      }));
      app.use(flash());
      app.use(passport.initialize());
      app.use(passport.session());
  }

})

