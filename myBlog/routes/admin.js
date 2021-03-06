var express = require("express");
var router = express.Router();
import * as Message from "../configs/config";
import * as UserController from "../controllers/UserController";
import * as PostController from "../controllers/PostController";
/* GET home page. */
// Luc vao trang admin, neu co req.user =>>> Lay user va post ve
router.get("/", async function(req, res, next) {
  const {offset} = req.query; // thi kp viet router.post("/:offset") => ?offset=x
  if (req.user) {
    const allPostsUsername = await PostController.listAllPostsUsername(req.query,req.user.username); // Lay list cac post cua username
    res.render("admin", { user: req.user, Mess1: "", posts: allPostsUsername });
  } else res.redirect("/users/login");
});

// EDIT- UPDATE PROFILE
router.put("/editprofile", async (req, res) => {
  const { image, password, repassword, username } = req.body;
  try {
    const updatedProfile = {
      username,
      image
    };
    // console.log(`password: ${password}`);
    // console.log(`repassword: ${repassword}`);
    if (password === repassword && image) {
      const profilebody = await UserController.userEdit(req.body); // Cho userEdit thuc hien xong, bat dau thuc hien update // req.body.image
      if (profilebody) {
        req.user = updatedProfile;
        req.session.save();
        res.json({
          result: Message.SUCCESS,
          message: Message.UPDATESUCCESS
        });
        // res.render("admin", {user: req.user, Mess1: Message.UPDATESUCCESS})
      } else {
        res.json({
          result: Message.FAILED,
          message: Message.UPDATEFAILED
        });
        // res.render("admin", {user: req.user, Mess1: Message.REGISNOTMATCH})
      }
    } else {
      res.json({
        result: Message.FAILED,
        message: Message.REGISNOTMATCH
      });
    }
  } catch (error) {
    throw error;
  }
});

// GET POST
router.get("/allposts/", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const allPosts = await PostController.listAllPosts(req.query);
    if (allPosts) {
      res.json({
        message: "Get all posts successfully!",
        data: allPosts
      });
    } else {
      res.json({
        message: "Get all posts failed!",
        data: {}
      });
    }
  } catch (error) {
    res.json({
      result: Message.FAILED,
      data: {},
      message: `Get all posts failed! Error: ${error}.`
    });
  }
});

// CREATE POST
router.post("/newpost", async (req, res) => {
  const { title, content, image, description, tags, email } = req.body;
  try {
    const postbody = await PostController.createPost(req.body);

    if (postbody) {
      res.json({
        result:Message.SUCCESS,
        message: Message.POSTCREATESUCCESS,
        data: {title,content,image,description,tags,author}
      });
    } else {
      // console.log("failed hello");
      // res.render("admin", {Error3: Message.POSTFAILED})
      res.json({
        result:Message.FAILED,
        message: Message.POSTCREATEFAILED,
        data: {}
      });
    }
  } catch (error) {
    res.json({
      result: Message.FAILED,
      data: {},
      message: `Create new post failed! Error: ${error}.`
    });
  }
});

// UPDATE POST
router.put("/editpost/:id", async (req, res) => {
  const { title, content, image, description, tags, author } = req.body;
  const { id } = req.params;

  try {
    const postneedtoupdate = await PostController.updatePost(req.body, id);
    if (postneedtoupdate) {
      res.json({
        message: "Successfully",
        data: { id, title, content, image, description, tags, author }
      });
    } else {
      res.json({
        message: "Failed",
        data: {}
      });
    }
  } catch (error) {
    res.json({
      result: Message.FAILED,
      data: {},
      message: `Update post failed! Error: ${error}.`
    });
  }
});

// DELETE POST
router.delete("/deletepost/:id", async (req, res) => {
  const { title, content, image, description, tags, author } = req.body;
  const { id } = req.params;
  // id= req.params.id
  // console.log('id :', id);
  try {
    const posttodelete = await PostController.deletePost(req.params);
    // console.log('posttodelete :', posttodelete);
    if (posttodelete) {
      res.json({
        result: Message.SUCCESS,
        message: "Successfully",
        data: {id}
      });
    } else {
      res.json({
        result: Message.FAILED,
        message: "failed",
        data: {id}
      })
    }
  } catch (error) {
    res.json({
      result: Message.FAILED,
      data: {},
      message: `Delete post failed! Error: ${error}.`
    });
  }
});

module.exports = router;
