const http = require('http');

function getClientIPv4(req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;

    if (ip && ip.startsWith('::ffff:')) {
        // Extract the IPv4 address from the mapped IPv6 address
        ip = ip.substr(7);
    } else if (ip === '::1') {
        // If it's localhost in IPv6, return the IPv4 equivalent
        ip = '127.0.0.1';
    }

    return ip;
}

http.createServer((req, res) => {
    const clientIp = getClientIPv4(req);

    // Log all headers
    console.log('Headers:', req.headers);

    // Send back the IP address
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`${clientIp}`);
}).listen(3000, () => {
    console.log('Server running on port 3000');
});