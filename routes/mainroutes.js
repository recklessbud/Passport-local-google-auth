const express = require("express")
const router = express.Router()
const {ensureAuth, ensureGuest} =  require("../middleware/ensureAuth")
const authController = require("../controller/authLocal")


//@desc     main page
//@route    GET/
 router.get('/', ensureGuest, (req, res)=>{
    res.render("page", {
        title: "home page"
    })
 })

 //@desc   profile page
 //@route   GET/profile

   router.get("/profile", ensureAuth, (req, res) => {
      const user = req.user
      res.render('profile', {user: user})
   })


//@desc   login page
//route   GET/login
  router.get("/login", authController.getLogin)

//@desc   signup page
//route   GET/signup
  router.get("/signup", authController.getSignup)


//@desc   login page
//route   POST/login
  router.post("/login", authController.postLogin)


//@desc   login page
//route   POST/login
 router.post('/signup', authController.postSignup)

//@desc   login page
//route   GET/logout
  router.get('/logout', authController.logout)
 


module.exports = router