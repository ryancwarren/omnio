"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const url = __importStar(require("url"));
class HttpServer {
    constructor() {
        this.server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url || '', true);
            const path = parsedUrl.pathname || '';
            const method = req.method || 'GET'; // Default to GET if method is not specified
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello!');
        });
    }
}
let server = new HttpServer();
server.server.listen(3000, () => {
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
