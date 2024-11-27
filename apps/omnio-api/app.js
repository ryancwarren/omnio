const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// CORS middleware setup (for development, restrict origins in production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// API endpoint for greetings
app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'Guest';
    res.json({ message: `Hello, ${name}!` });
});

app.get('/api/die', (req, res) => {
    process.exit(1);
});

// Catch-all 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});