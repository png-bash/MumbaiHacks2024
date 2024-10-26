// app.js
const express = require('express');
const CrimeSafetyAnalyzer = require('./crimeSafetyAnalyzer');
const { spawn } = require('child_process');
const cors  = require('cors')

const app = express();
app.use(express.json());

// Initialize analyzer
const analyzer = new CrimeSafetyAnalyzer();

app.use(cors());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

    next();
});

app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    console.log('Received question:', question);

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    const pythonProcess = spawn('python3', ['./ask_groq.py', question]);
    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
        console.log('Python stdout:', data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
        console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log('Python process exited with code:', code);
        
        if (code !== 0) {
            console.error('Error output:', errorString);
            return res.status(500).json({ error: 'Processing error', details: errorString });
        }

        try {
            // Parse the JSON response from Python
            const pythonResponse = JSON.parse(dataString);
            res.json(pythonResponse);
        } catch (error) {
            console.error('Error parsing Python response:', error);
            res.status(500).json({ 
                error: 'Error parsing response',
                details: dataString
            });
        }
    });
});

async function getCoordinates(address) {
    try {
        // Replace spaces with '+' for URL encoding
        const encodedAddress = encodeURIComponent(address);

        // Send GET request to Nominatim API using fetch
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.length === 0) {
            console.log("Location not found.");
            return null;
        }

        // Extract latitude and longitude from the response
        const { lat, lon } = data[0];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        return { latitude: lat, longitude: lon };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
}

// Example usage
// const address = "Kurla, Mumbai";
// getCoordinates(address);



// Load data when server starts
const initializeAnalyzer = async () => {
    try {
        await analyzer.loadData('mumbai_crime_dataset.csv');
        console.log('Crime data loaded successfully');
    } catch (error) {
        console.error('Error loading crime data:', error);
        process.exit(1);
    }
};

// API endpoint for safety analysis
app.post('/api/analyze-safety', async (req, res) => {
    try {
        console.log("hi")
        const { address } = req.body
        console.log(address)
        // getCoordinates(address);
        if (!address) {
            return res.status(400).json({
                error: 'address required'
            });
        }
        const { latitude, longitude } = await  getCoordinates(address);

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
        console.log(result)
        res.json(result);

    } catch (error) {
        console.error('Error analyzing location:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await initializeAnalyzer();
    console.log(`Server running on port ${PORT}`);
});
