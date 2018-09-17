var express = require('express');
var router = express.Router();
import * as PostController from '../controllers/PostController';
import * as Configs from '../configs/config';

/* GET home page. */
router.get('/', async function(req, res, next) {
    const postss = await PostController.allPostsInDB(req.body);
    if (req.session.user) {
        res.render('home', { user: req.session.user, postss });
    } else {
        res.render('home', {user: "", postss});
    }
  });


// CREATE POST
router.post('/newpost', async (req,res,next) => {
    const {title,content,tags,author} = req.body;
    try {
        const postContent = await PostController.createNewPost(req.body);
        // console.log(postContent);
        if (postContent && title != "" && content != "") {
            res.json({
                result: Configs.SUCCESS,
                data: postContent,
                message: Configs.POST_CREATE_SUCCESS
            })
        } else {
            res.json({
                result: Configs.FAILED,
                message: Configs.POST_CREATE_FAILED
            })
        }
    } catch (error) {
        res.json({
            result: Configs.FAILED,
            message: `Failed. Error: ${error}.`
        })
    }
})
module.exports = router;
