const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Add logging middleware
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});