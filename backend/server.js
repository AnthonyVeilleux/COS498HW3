// backend/server.js
// Main server file for the PDF viewer application
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const { router, notFoundHandler } = require('./routes');

const PORT = 80;

// Set view engine and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from pdfs directory
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Use the routing module
app.use('/', router);

// 404 handler - must be registered after all other routes
app.use(notFoundHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Available routes:`);
    console.log(`  GET  /          - Home page with PDF list`);
    console.log(`  GET  /pdf/:name - View individual PDF`);
    console.log(`  GET  /api/pdfs  - Get PDF list as JSON`);
    console.log(`  GET  /health    - Health check`);
});