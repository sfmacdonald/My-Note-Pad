// Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Middleware to parse JSON
router.use(express.json());

// Define API routes
router.get('/notes', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
  res.json(db);
});

router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8'));
  let updatedDb = db.filter(item => item.id !== req.params.id);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedDb));
  res.json(updatedDb);
});

module.exports = router;
