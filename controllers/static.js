var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  response.sendfile('layouts/index.html')
});

router.use(express.static('assets'));

module.exports = router;
