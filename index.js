// npm i dependencies
const express = require("express")
const mongoose = require('mongoose')
const morgan = require('morgan')
const MongoStore = require("connect-mongo")
const cors = require("cors")
const session = require("express-session")
const passport = require('passport')
const flash = require("flash")

//path to the mongo connection
const connectToDb = require("./config/database")

//path to routes
 const mainRoutes = require("./routes/mainroutes")
 const googleAuth = require("./routes/googleAuthRoutes")
//configure express
const apps = express()

//path the env environment
  require("dotenv").config({path: "./config/.env"})

  //path to passport
  require("./config/passport")

//the port for server to run on
const PORT = process.env.PORT
      connectToDb();

// use cors
 apps.use(cors())

 // set view engine
 apps.set("view engine", "ejs")

 // use json
 apps.use(express.json())

 //extend
 apps.use(express.urlencoded({extended: true}))

 //static files
 apps.use(express.static('public'))
 //use morgan in dev mode
  if (process.env.NODE_ENV === "development") {
     apps.use(morgan('dev'))
  }

  //sessions in db
apps.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  })
); 

 // passport config
  apps.use(passport.initialize());
  apps.use(passport.session()); 

 apps.use(flash())

// use the mainroutes
  apps.use('/', mainRoutes)  
  apps.use('/auth', googleAuth)
//listen and serve to the port
apps.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);    
})