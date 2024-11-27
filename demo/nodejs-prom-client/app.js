const express = require('express');
const promClient = require('prom-client');

// Create an Express app
const app = express();

// Set up Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

// Middleware to increment the counter on every request
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : 'unknown',
      code: res.statusCode
    });
  });
  next();
});

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to expose metrics
// app.get('/metrics', (req, res) => {
//   res.set('Content-Type', promClient.register.contentType);
//   res.end(promClient.register.metrics());
// });

app.get('/metrics', async (req, res) => {
    try {
      const metrics = await promClient.register.metrics();
      res.set('Content-Type', promClient.register.contentType);
      res.end(metrics);
    } catch (err) {
      res.status(500).end(err);
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});