// app.js
const express = require('express');
const CrimeSafetyAnalyzer = require('./crimeSafetyAnalyzer');

const app = express();
app.use(express.json());

// Initialize analyzer
const analyzer = new CrimeSafetyAnalyzer();

// Load data when server starts
const initializeAnalyzer = async () => {
    try {
        await analyzer.loadData('crime_data.csv');
        console.log('Crime data loaded successfully');
    } catch (error) {
        console.error('Error loading crime data:', error);
        process.exit(1);
    }
};

// API endpoint for safety analysis
app.post('/api/analyze-safety', (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Validate input
        if (!latitude || !longitude) {
            return res.status(400).json({
                error: 'Latitude and longitude are required'
            });
        }

        // Convert to numbers and validate
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                error: 'Invalid latitude or longitude values'
            });
        }

        // Analyze location
        const result = analyzer.analyzeLocation(lat, lon);
        res.json(result);

    } catch (error) {
        console.error('Error analyzing location:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await initializeAnalyzer();
    console.log(`Server running on port ${PORT}`);
});