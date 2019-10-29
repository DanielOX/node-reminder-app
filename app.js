const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const cors = require('cors')

// MongoDB URI
const { mongoURI } = require('./config/config')

// MongoDB Driver
mongoose.connect(mongoURI,{useUnifiedTopology:true,useNewUrlParser:true})
        .then( _ => console.log("Connected to mongo server.")  )
        .catch( err =>  {
            console.log("Could not connect to mongo server!");
            return console.log(err);   
        });
  

// Setting Up Express Templating Engine

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressEjsLayout)
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Initialize Session

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}))

// Setting Up CORS
app.use(cors())

// Controllers

const WelcomeController = require('./controller/WeclomeController')
const UserController = require('./controller/UsersController')
const NotificationController = require('./controller/NotificationController')
const AuthController = require('./controller/AuthController')



// Controller Call
app.use(function(req, res, next) {
    let isLoggedIn = req.session && req.session.user
    res.locals.isLoggedIn = isLoggedIn;
    if(isLoggedIn){
        res.locals.user = req.session.user
    }
    next();
  });
app.use('/auth',AuthController)
app.use('/',WelcomeController)
app.use('/users',UserController)
app.use('/notifications',NotificationController)
// Server Start

app.listen(4001,(err) => {
    console.log(err ? 'error' : 'running or port 4001')
})