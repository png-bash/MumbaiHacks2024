const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to receive location data
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`User's location - Latitude: ${latitude}, Longitude: ${longitude}`);
    
    // Respond to the client
    res.json({ status: 'Location received', latitude, longitude });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
