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
  
    // Event listener for saving a note
    saveNoteButton.addEventListener('click', function() {
      const noteTitle = noteTitleInput.value.trim();
      const noteText = noteTextInput.value.trim();
      if (noteTitle && noteText) {
        // Assuming you have a function to send data to your server
        saveNote({ title: noteTitle, text: noteText });
        noteTitleInput.value = ''; // Clear the form after saving
        noteTextInput.value = '';
        updateButtonVisibility();
      }
    });
  
    // Initially display only the New Note button
    newNoteButton.style.display = 'inline-block';
  
    // Update button visibility when there's input in the note title or text
    noteTitleInput.addEventListener('input', updateButtonVisibility);
    noteTextInput.addEventListener('input', updateButtonVisibility);
  
    // Function to clear the form with the clearFormButton
    clearFormButton.addEventListener('click', function() {
      noteTitleInput.value = '';
      noteTextInput.value = '';
      updateButtonVisibility(); // Update buttons visibility after clearing form
    });
  
    // Add a function to handle saving the note to the server
    function saveNote(noteData) {
      // Use fetch API or similar to post the noteData to your server
      fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Note saved:', data);
        // Optionally, refresh the list of notes or display a success message
      })
      .catch((error) => {
        console.error('Error saving note:', error);
      });
    }
  });
  