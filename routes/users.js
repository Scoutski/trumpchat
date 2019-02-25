var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  res.send('Attempted to create a user');
})

module.exports = router;
