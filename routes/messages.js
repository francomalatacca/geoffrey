var express = require('express');
var router = express.Router();
var processIncomingObjects = require('../helper/messages');

router.post('/', function(req, res, next) {
    
    const response = processIncomingObjects(req.body)
    console.log(respo);
    res.send(response);
});

module.exports = router;
