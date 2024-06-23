const http = require("http");
const fs = require("fs/promises");
const port = 5043;
const host = "localhost";

const requestListener = function (req, res) {
    switch (decodeURI(req.url)) {
        case "/":
            doReadFile("index.html");
            break;
        case "/fonts.css":
            doReadFile("fonts.css", "text/css");
            break;
        case "/reset.css":
            doReadFile("reset.css", "text/css");
            break;
        case "/index.css":
            doReadFile("index.css", "text/css");
            break;
        case "/index.js":
            doReadFile("index.js", "text/javascript");
            break;
        case "/Megan Logo.png":
            doReadFile("Megan Logo.png", "image/png");
            break;
    }

    function prettyConsole(...params) {
        let currentDate = new Date();
        let hours = currentDate.getUTCHours();
        let minutes = currentDate.getUTCMinutes();
        let seconds = currentDate.getUTCSeconds();
        let tag = `[${hours}:${minutes}:${seconds}]`;

        return console.log.apply(console, [tag, ...params]);
    }

    function doReadFile(
        readWhat,
        encoding = "text/html",
        assetFolder = "public"
    ) {
        fs.readFile(`${__dirname}/${assetFolder}/${readWhat}`)
            .then((contents) => {
                res.setHeader("Content-Type", encoding);
                res.writeHead(200);
                prettyConsole("[200 OK!]", readWhat);
                res.end(contents);
            })
            .catch((err) => {
                res.writeHead(500);
                prettyConsole("[500 Error!]", err);
                res.end(err);
                return;
            });
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
