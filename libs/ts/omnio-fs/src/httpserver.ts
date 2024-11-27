import * as http from 'http';
import * as url from 'url';

class HttpServer {

    server: http.Server;

    constructor() {
        this.server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
            const parsedUrl = url.parse(req.url || '', true);
            const path = parsedUrl.pathname || '';
            const method = req.method || 'GET'; // Default to GET if method is not specified

            const socket = req.socket;
            const remoteIpAddr = socket.remoteAddress;

            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write(`remote IP Addr: ${remoteIpAddr}`);
            res.write(`headers: ${Object.entries(req.headers)}`)
            res.end('Done!');

        });
    }
}

let server = new HttpServer();
server.server.listen(3000, () => {
    console.log("Server listening...");
})

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