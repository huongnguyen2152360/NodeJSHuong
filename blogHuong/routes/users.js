var express = require("express");
var router = express.Router();
const passport = require("passport");
import * as UserController from "../controllers/UserController";
import * as Configs from "../configs/config";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("users");
  }
});

// GET FORGOT PASS
router.get("/forgotpass", async (req, res) => {
  res.render("forgotpass");
});

//SEND EMAIL (FORGOT PASS)
router.post("/sendresetpass", async (req, res) => {
  const { email } = req.body;
  try {
    const sendEmail = await UserController.emailResetPass(req.body);
    if (sendEmail) {
      res.json({
        result: Configs.SUCCESS,
        message: Configs.EMAIL_SEND_SUCCESS
      });
    } else {
      res.json({
        result: Configs.FAILED,
        message: Configs.EMAIL_SEND_FAILED
      });
    }
  } catch (error) {
    res.json({
      result: Configs.FAILED,
      message: `Failed. Error: ${error}.`
    });
  }
});

// CHECK TIME OUT
router.get("/checktimeout/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const checkTime = await UserController.checkTimeOut(req.params);
    if (checkTime) {
      res.render("changepass");
    } else {
      res.render("404");
    }
  } catch (error) {
    throw error;
  }
});

//CHANGE PASSWORD (FORGOT PASS)
router.post("/changepassword", async (req, res) => {
  console.log('vao router changepassword')
  const { email, password, repassword } = req.body;
  try {
    if (repassword === password) {
      const passReset = await UserController.resetPass(req.body);
      if (passReset) {
        res.json({
          result: Configs.SUCCESS,
          message: Configs.USER_RESET_PASS_SUCCESS
        });
      } else {
        res.json({
          result: Configs.FAILED,
          message: Configs.USER_RESET_PASS_NOTENOUGH
        });
      }
    } else {
      res.json({
        result: Configs.FAILED,
        message: Configs.USER_RESET_PASS_FAILED
      });
    }
  } catch (error) {
    res.json({
      result: Configs.FAILED,
      message: `Failed. Error: ${error}.`
    });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password, repassword, avatar } = req.body;

  try {
    if (email && password === repassword) {
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
  const { email, password } = req.body;
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
    res.redirect("/");
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
    res.redirect("/");
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
    res.redirect("/");
  }
);

module.exports = router;
