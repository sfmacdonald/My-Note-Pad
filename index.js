const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { prototype } = require('stream');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 5500;
const db = require('./db/db.json');

app.use(cors({
  origin: 'http://example.com',
  methods: ['GET', 'POST'], // Allowable methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
}));

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

//POST 
///api/notes receives a new note to save on the request body and add it to db.json, then returns new note to the client.
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  db.push(newNote);
  try {
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
  } catch (error) {
      console.error('Error saving new note:', error);
      res.status(500).send('Error saving new note');
  }
});

//DELETE
// notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.
app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) =>
        note.id !== req.params.id)

    // update the db.json file to reflect the modified notes array
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb))

    // send that removed note object back to user
    readFile.json(newDb)
})

//HTML Routes
//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//App listens with front end on this port
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))
