const https = require("https");
const fs = require('fs');
const q = require('querystring');
const privateKey = fs.readFileSync('cert/private.pem', 'utf8');
const certificate = fs.readFileSync('cert/chirp_ws.crt', 'utf8');
const ca_cert = fs.readFileSync('cert/chirp_ws.ca-bundle', 'utf8');
const credentials = {key: privateKey, cert: certificate, ca: ca_cert, passphrase: 'FgSb33Cl'};

const server = https.createServer(credentials, (request, response) => {
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;

    const message = JSON.stringify({
        timestamp: Date.now(),
        rawHeaders,
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url
    });
    logMessage(message);
    console.log('*******' +  url + '********');
    challange = (url.split("challenge=")[1]).split('&')[0]
    response.write(challange);
    response.end();
});

function logMessage(message, consoleOutputMessage = true, logFileName = 'server.log') {
    if (consoleOutputMessage) {
        console.log(message);
    }

    fs.appendFile(logFileName, message,function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

server.listen(3000);
