var express = require("express");
var router = express.Router();
import * as UserController from "../controllers/UserController";
import * as Configs from "../configs/config";

/* GET home page. */
router.get("/", async (req, res, next) => {
  // console.log(req.session.user);
  if (req.session.user) {
    res.render("admin", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

router.put("/editprofile", async (req, res, next) => {
  const { password, avatar, username, repassword } = req.body;
  try {
    if (password === repassword && avatar || avatar) {
      const userUpdateInfo = await UserController.editUserProfile(req.body);
      if (userUpdateInfo) {
        (req.session.user = { avatar }),
          req.session.save(),
          res.json({
            result: Configs.SUCCESS,
            message: Configs.USER_UPDATE_SUCCESS
          });
      } else {
        res.json({
          result: Configs.FAILED,
          message: Configs.USER_UPDATE_NOTHING
        });
      }
    } else if (password === repassword && !avatar) {
      const userUpdateInfo = await UserController.editUserProfile(req.body);
      if (userUpdateInfo) {
          res.json({
            result: Configs.SUCCESS,
            message: Configs.USER_UPDATE_SUCCESS
          });
      } else {
        res.json({
          result: Configs.FAILED,
          message: Configs.USER_UPDATE_NOTHING
        });
      }
    } else if (password != repassword) {
      res.json({
        result: Configs.FAILED,
        message: Configs.USER_UPDATE_PASSUNMATCHED
      });
    }
      

  } catch (error) {
    throw error;
  }
});
module.exports = router;
