var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/chat1', function(req, res, next) {
  res.render('chat1', { title: 'Express' });
});


module.exports = router;
