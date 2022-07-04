const http = require("http");
const fs = require('fs');

const server = http.createServer((request, response) => {
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
    response.end();
});

function logMessage(message, consoleOutputMessage = true, logFileName = 'server.log') {
    if (consoleOutputMessage) {
        console.log(message);
    }

    fs.appendFile(logFileName, message, () => (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

server.listen(3000);