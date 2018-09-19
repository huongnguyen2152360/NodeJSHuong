// Express hỗ trợ các phương thức HTTP và midleware tạo ra môt API
const express = require("express");
const router = express.Router();
import * as PostController from "../controllers/PostController";

router.get("/topic/:id", async (req, res, next) => {
  const { id } = req.params;
  const postByID = await PostController.getPostByID(req.params);
  if (req.session.user) {
    res.render("details", { user: req.session.user,  postByID });
  } else {
    res.render("details", { user: "",  postByID });
  }
});

// GET POST BY ID

module.exports = router;
