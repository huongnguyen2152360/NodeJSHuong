import express from "express";
var router = express.Router();
import { isEmpty, isEmail, isURL, toDate } from "validator";
import User from '../models/User';
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Register user
router.post("/register", async (req, res) => {
  let { name, password, email, profileURL, gender, dob } = req.body;
  // User should secure password before sending
  if (
    isEmpty(name) ||
    isEmpty(password) ||
    !isEmail(email) ||
    !isURL(profileURL) ||
    isEmpty(gender) ||
    toDate(dob) === null
  ) {
    res.json({
      result: "failed",
      data: {},
      message: `name, password, gender must not be empty. Email, profileURL, dob must be in correct format.`
    });
    return;
  }
  try {
    const newUser = await User.create(
      {
        name,
        password,
        email,
        profileurl: profileURL,
        gender,
        dob
      },
      {
        fields: ["name", "password", "email", "profileurl", "gender", "dob"]
      }
    );
    if (newUser) {
      res.json({
        result: "ok",
        data: newUser,
        message: `Insert new User successfully!`
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: `Insert new User failed.`
      });
    }
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Insert new User failed. Error: ${error}.`
    });
  }
});

//Login user
router.post("/login", async (req, res) => {
  let { name, email } = req.body;
  if (isEmpty(name) || !isEmail(email)) {
    res.json({
      result: "failed",
      data: {},
      message: "Name must not be empty. Email must be in correct format."
    });
    return;
  }
  try {
    let users = await User.findAll({
      attributes: ["name", "password", "email", "profileurl", "gender", "dob"],
      where: {
        name,
        email
      }
    });
    if (users) {
      res.json({
        result: "ok",
        data: users,
        message: "Login successfully!"
      });
    } else {
      res.json({
        esult: "failed",
        data: {},
        message: "Cannot find user. Check your name and email."
      });
    }
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Login failed. Error: ${error}.`
    });
  }
});

module.exports = router;
