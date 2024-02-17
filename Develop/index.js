const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const app = express();
const port = 5500;

// Middleware to parse JSON
app.use(express.json());app.use(express.static('public'));

// API Routes
// GET /api/notes - Return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
  res.json(db);
});

// POST /api/notes - Save a new note
app.post('/api/notes', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  db.push(userNote);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(db));
  res.json(userNote);
});

// DELETE /api/notes/:id - Delete a note by id
app.delete('/api/notes/:id', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
  let updatedDb = db.filter(item => item.id !== req.params.id);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedDb));
  res.json(updatedDb);
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

document.addEventListener('DOMContentLoaded', function() {
  const saveNoteButton = document.querySelector('.save-note');
  const newNoteButton = document.querySelector('.new-note');
  const clearFormButton = document.querySelector('.clear-btn');
  const noteTitleInput = document.querySelector('.note-title');
  const noteTextInput = document.querySelector('.note-textarea');

  // Function to check input fields and adjust button visibility
  function updateButtonVisibility() {
      // Check if there's any data in the note
      const isNotePresent = noteTitleInput.value.trim() !== '' || noteTextInput.value.trim() !== '';

      // Show save button if there's data in the new note
      saveNoteButton.style.display = isNotePresent ? 'inline-block' : 'none';

      // Show clear button if there's data in the new note
      clearFormButton.style.display = isNotePresent ? 'inline-block' : 'none';
  }

  // Initially display only the New Note button
  newNoteButton.style.display = 'inline-block';

  // Update button visibility when there's input in the note title or text
  noteTitleInput.addEventListener('input', updateButtonVisibility);
  noteTextInput.addEventListener('input', updateButtonVisibility);

  // Assuming you want to clear the form with the clearFormButton
  clearFormButton.addEventListener('click', function() {
      noteTitleInput.value = '';
      noteTextInput.value = '';
      updateButtonVisibility(); // Update buttons visibility after clearing form
  });

  // Add more event listeners as needed, for example, to handle the save functionality
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

