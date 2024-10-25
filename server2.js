const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

app.post('/api/ask', (req, res) => {
    const question = req.body.question;

    // Command to run the Python script, passing in the question as an argument
    const command = `python3 ./ask_groq.py "${question}"`;
    // const command = `python3 ./scripts/ask_groq.py "${question}"`;


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Server error' ,error});
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Server error' });
        }
        
        // Send back the response from the Python script
        res.json({ response: stdout });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
