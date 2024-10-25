// Import the Express library
const express = require('express');

// Initialize the Express app
const app = express();

// Define a port number for the server to listen on
const PORT = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
