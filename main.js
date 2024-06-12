const http = require("http");
const fs =  require("fs/promises");
const port = 5043;
const host = "localhost";

const requestListener = function (req, res) {

    switch ( req.url ) {
        case "/":
            doReadFile("index.html");
            break;
        case "/index.css":
            doReadFile("index.css", "text/css");
            break;
        case "/index.js":
            doReadFile("index.js", "text/javascript");
            break;
    }

    function doReadFile(readWhat, encoding = "text/html") {

        fs.readFile(`${__dirname}/${readWhat}`)
        .then(contents => {
            res.setHeader("Content-Type", encoding);
            res.writeHead(200);
            console.log("200 OK: reading ", readWhat)
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });

    }

    
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});