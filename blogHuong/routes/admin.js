var express = require("express");
var router = express.Router();
import * as UserController from "../controllers/UserController";
import * as PostController from "../controllers/PostController";
import * as Configs from "../configs/config";

/* GET admin page. */
router.get("/", async (req, res, next) => {
  const { offset } = req.query; // thi kp viet router.post("/:offset") => ?offset=x
  // console.log(req.session.user.username);
  
  if (req.session.user) {
    const posts = await PostController.allPostsByUsername(
      req.query,
      req.session.user
    );
    res.render("admin", { user: req.session.user, posts });
    // console.log('POSTS :', posts);
  } else {
    res.redirect("/users");
  }
});

// EDIT PROFILE
router.put("/editprofile", async (req, res, next) => {
  const { password, avatar, username, repassword } = req.body;
  try {
    if ((password === repassword && avatar) || avatar) {
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

// EDIT POST
router.put("/editpost", async (req, res, next) => {
  const { id, title, content, tags, author } = req.body;
  try {
    const postToEdit = await PostController.editPost(req.body);
    if (postToEdit) {
      res.json({
        result: Configs.SUCCESS,
        data: postToEdit,
        message: Configs.POST_EDIT_SUCCESS
      });
    } else {
      res.json({
        result: Configs.FAILED,
        message: Configs.POST_CREATE_FAILED
      });
    }
  } catch (error) {
    throw error;
  }
});

// DELETE POST
router.delete('/deletepost', async(req,res,next) => {
  const { id, title, content, tags, author } = req.body;
  try {
    const postToDelete = await PostController.deletePost(req.body);
    res.json({
      result: Configs.SUCCESS,
      message: Configs.POST_DELETE_SUCCESS
    })
  } catch (error) {
    res.json({
      result: Configs.FAILED,
      message: `Delete post failed! Error: ${error}.`
    })
  }
})

module.exports = router;
