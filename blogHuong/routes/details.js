// Express hỗ trợ các phương thức HTTP và midleware tạo ra môt API 
const express = require('express'); 
const router = express.Router();
import * as PostController from '../controllers/PostController';

router.get('/topic', async (req,res,next) => {
    const postss = await PostController.allPostsInDB(req.body);
    if (req.session.user) {
      res.render("details", { user: req.session.user, postss });
    } else {
      res.render("details", { user: "", postss });
    }
})

module.exports = router;