const express = require('express');
const fs = require('fs');
const path = require('path');
const { prototype } = require('stream');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));

// API Routes
// GET /api/notes - Return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
    res.json(db);
  } catch (error) {
    res.status(500).send('Error reading note database');
  }
});

// POST /api/notes - Save a new note
app.post('/api/notes', (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };
    db.push(userNote);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(db));
    res.json(userNote);
  } catch (error) {
    res.status(500).send('Error saving note');
  }
});

// DELETE /api/notes/:id - Delete a note by id
app.delete('/api/notes/:id', (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
    let updatedDb = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedDb));
    res.json(updatedDb);
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

// HTML Routes
// GET /notes - Return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET * - Return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
