var axios = require('axios');

function processIncomingObjects(object) {
    if (object["object"] && object["object"] === "whatsapp_business_account") {

        if (object["entry"] && object["entry"] instanceof Array) {
            for (var el in object["entry"]) {
                if (object["entry"][el]["changes"] && object["entry"][el]["changes"] instanceof Array) {
                    let changes = object["entry"][el]["changes"];
                    for (var change in changes) {
                        if (changes[change]["field"] == "messages") {

                            let text = ""
                            for (var message in changes[change]["value"]["messages"]) {

                                if (changes[change]["value"]["messages"][message]["type"] == "text") {
                                    text = text.concat(changes[change]["value"]["messages"][message]["text"]["body"], ' ')
                                }
                            }
                            return reply(processMessage(text.trim()));
                        } else {
                            console.log("processing incoming object - the object is not a message");
                        }
                    }
                } else {
                    console.log("processing incoming object - changes is not an array. It cannot be processed.");

                }
            }
        } else {
            console.log("processing incoming object - entry is not an array. It cannot be processed.");
        }
    }
}


function processMessage(entry) {
    return entry;
}

function reply(message) {
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": "393293764350",
        "type": "text",
        "text": {
            "body": message
        }
    });

    var config = {
        method: 'post',
        url: 'https://graph.facebook.com/v13.0/102405779198308/messages',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer EAAGNADBnvGoBANM3pa91rzodm3kIh6gBV1WrQMsWjbefIXWZB21jZBSmr1mTc9jgGut2am24ZB97JaFPzi5DJbC27sgwcO7LSCINqZCaZCdotDdKTD4uwbLKtpKqGZBEnfYkle99z50RlNTuCZCfUMnk7A7gZC1EmROddB3siPEogJgduHbvnQDe0RKXDZCIjwAgFzUMaZBsZBycDaouZCKxHqOi'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}


module.exports = processIncomingObjects;
