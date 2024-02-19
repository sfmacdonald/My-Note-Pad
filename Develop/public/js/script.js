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
  
         // Hide New Note button if there's data in the new note
        newNoteButton.style.display = isNotePresent ? 'none' : 'inline-block';
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
  
    // Add event listener for the Save Note button
  saveNoteButton.addEventListener('click', function() {
    // Collect note data
    const noteData = {
        title: noteTitleInput.value.trim(),
        text: noteTextInput.value.trim(),
    };
  
    // Validate note data to ensure it's not empty
    if (!noteData.title || !noteData.text) {
        alert('Please fill out both the title and the note text fields.');
        return;
    }
  
    // Send POST request to save the note
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
        // Optionally, clear the form
        noteTitleInput.value = '';
        noteTextInput.value = '';
        updateButtonVisibility(); // Update buttons' visibility
  
         // Refresh the page to show the updated list of notes
         window.location.reload();
    })
    .catch((error) => {
        console.error('Error saving note:', error);
    });
  });
  
  });