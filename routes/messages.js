var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    const response = processIncomingObjects(req.body)
    res.send(response);
});

function processIncomingObjects(object) {
    if(object["object"] && object["object"] === "whatsapp_business_account") {
        if(object["entry"] && object["entry"] instanceof Array) {
            for (var el in object["entry"]) {
                if( object["entry"]["el"]["field"] == "message") {
                    for (var message in object["entry"]["el"]["value"]["messages"]) {
                        text = ""
                        if(object["entry"]["el"]["value"]["messages"]["type"] == "text") {
                            text = text + " " + object["entry"]["el"]["value"]["messages"]["text"]["body"]
                        }
                    }
                    return processMessage(text);
                }
            }
        }
    }
}
}

function processMessage(entry) {
    console.log("processing " + entry)
    return entry == 'ciao' ? 'Hello' : '?';
}
module.exports = router;
