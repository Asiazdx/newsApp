var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/', function(req, res, next) {
    res.render('begin');
});
module.exports = router;
