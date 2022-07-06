var express = require('express');
var router = express.Router();
var processIncomingObjects = require('../helper/messages');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const response = processIncomingObjects(req.body)
    res.send(response);
});

module.exports = router;
