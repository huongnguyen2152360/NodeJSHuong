var express = require("express");
var router = express.Router();
const passport = require("passport");
import * as UserController from "../controllers/UserController";
import * as Configs from "../configs/config";
import { userInfo } from "os";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("/");
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password, repassword, avatar } = req.body;
  
  try {
    if (username && password === repassword) {
      const registerUser = await UserController.createNewUser(req.body); //createNewUser return newUser
      res.json({
        result: "success",
        message: Configs.USER_REGIS_SUCCESS,
        data: registerUser
      });
    } else {
      res.json({
        result: "failed",
        message: Configs.USER_REGIS_FAILED,
        data: {}
      });
    }
  } catch (error) {
    res.json({
      result: "failed",
      message: `Failed. Error: ${error}.`,
      data: {}
    });
  }
});

//LOG IN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginAlready = await UserController.userLogin(req.body);
    if (loginAlready) {
      req.session.user = loginAlready;
      req.session.save();
      // console.log('login success');
      res.json({
        result: Configs.SUCCESS,
        message: Configs.USER_LOGIN_SUCCESS
      });
    } else {
      // ajax chi accept json
      res.json({
        result: Configs.FAILED,
        data: {},
        message: Configs.USER_LOGIN_FAILED
      });
    }
  } catch (error) {
    res.json({
      result: Configs.FAILED,
      message: `Failed. Error: ${error}.`,
      data: {}
    });
  }
});

//LOG OUT
router.post("/logout", async (req, res) => {
  // console.log('LOUGOUTTTTT');
  await req.session.destroy();
  res.json({
    result: Configs.SUCCESS,
    data: null,
    message: Configs.USER_LOGOUT_SUCCESS
  });
});


// ___________________________________________________________________
//                    CONNECT WITH FACEBOOK
// for fb to send consent screen to user
router.get("/facebook", passport.authenticate("facebook"));

//call back route for fb to redirect to
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/users/login",
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);


//                    CONNECT WITH GOOGLE
//for gg to send consent screen to user
router.get(
  "/google",
  passport.authenticate("google", {
    //what to retrieve from user profile
    scope: ["profile", "email"]
  }),
  function(req, res) {}
);
// callback route for gg to redirect to
// passport authenticate exchange code for user profile => cbi callback function (UC)
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/users/login",
    session: false // k su dung session cua passport
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);

//           CONNECT WITH GITHUB
//for github to send consent screen to user
router.get("/github", passport.authenticate("github"));

//callback route for github to redirect to
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/users/login",
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

module.exports = router;
