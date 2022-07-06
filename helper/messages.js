function processIncomingObjects(object) {
    if(object["object"] && object["object"] === "whatsapp_business_account") {

        if(object["entry"] && object["entry"] instanceof Array) {
            for (var el in object["entry"]) {
                if( object["entry"][el]["changes"] && object["entry"][el]["changes"] instanceof Array) {
                    let changes = object["entry"][el]["changes"];
                    for(var change in changes) {
                    if (changes[change]["field"] == "messages") {
                        
                        let text = ""
                        for (var message in changes[change]["value"]["messages"]) {
   
                            if(changes[change]["value"]["messages"][message]["type"] == "text") {
                                text = text.concat(changes[change]["value"]["messages"][message]["text"]["body"], ' ')
                            }
                        }
                        return processMessage(text.trim());
                    } else {
                        console.log("processing incoming object - the object is not a message");
                    }}
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
module.exports = processIncomingObjects;
