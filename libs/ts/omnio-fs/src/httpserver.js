"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var HttpServer = /** @class */ (function () {
    function HttpServer() {
        this.server = http.createServer(function (req, res) {
            var parsedUrl = url.parse(req.url || '', true);
            var path = parsedUrl.pathname || '';
            var method = req.method || 'GET'; // Default to GET if method is not specified
            var socket = req.socket;
            var remoteIpAddr = socket.remoteAddress;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("remote IP Addr: ".concat(remoteIpAddr));
            res.write("headers: ".concat(Object.entries(req.headers)));
            res.end('Done!');
        });
    }
    return HttpServer;
}());
var server = new HttpServer();
server.server.listen(3000, function () {
    console.log("Server listening...");
});
// const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
//     const parsedUrl = url.parse(req.url || '', true);
//     const path = parsedUrl.pathname || '';
//     // Log the request
//     console.log(`Request received for path: ${path}`);
//     // Simple routing
//     switch (path) {
//         case '/':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('Hello, World!');
//             break;
//         case '/about':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('This is the about page.');
//             break;
//         default:
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('404 Not Found');
//     }
// });
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
