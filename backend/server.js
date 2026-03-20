const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// FIX 1: Allow Render to assign the port automatically, fallback to 5000 for local testing
const PORT = process.env.PORT || 5000;

app.use(cors());

// Load student data synchronously on startup (Acts as our mock DB)
const studentsPath = path.join(__dirname, 'student_data.json');
const studentsData = JSON.parse(fs.readFileSync(studentsPath, 'utf-8'));

// FIX 2: Add a root route so your live URL doesn't show "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Student Search API is running! Use the /api/search?q=yourquery endpoint to find students.');
});

app.get('/api/search', (req, res) => {
    const query = req.query.q || '';
    
    // Server-side validation: don't search if less than 3 characters
    if (query.length < 3) {
        return res.json([]);
    }

    const lowerCaseQuery = query.toLowerCase();

    // Filter students: Case-insensitive match, handles spaces and similar names
    const matchedStudents = studentsData.filter(student => 
        student.name.toLowerCase().includes(lowerCaseQuery)
    );

    // Return only the first 5 matches to optimize performance
    res.json(matchedStudents.slice(0, 5));
});

app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});
