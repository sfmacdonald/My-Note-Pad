document.addEventListener('DOMContentLoaded', function() {
    const saveNoteButton = document.querySelector('.save-note');
    const newNoteButton = document.querySelector('.new-note');
    const clearFormButton = document.querySelector('.clear-btn');
    const noteTitleInput = document.querySelector('.note-title');
    const noteTextInput = document.querySelector('.note-textarea');
  
    // Function to check input fields and adjust button visibility
    function updateButtonVisibility() {
        const isNotePresent = noteTitleInput.value.trim() !== '' || noteTextInput.value.trim() !== '';
        saveNoteButton.style.display = isNotePresent ? 'inline-block' : 'none';
        clearFormButton.style.display = isNotePresent ? 'inline-block' : 'none';
        newNoteButton.style.display = isNotePresent ? 'none' : 'inline-block';
    }
  
    noteTitleInput.addEventListener('input', updateButtonVisibility);
    noteTextInput.addEventListener('input', updateButtonVisibility);
  
    clearFormButton.addEventListener('click', function() {
        noteTitleInput.value = '';
        noteTextInput.value = '';
        updateButtonVisibility();
    });
  
    saveNoteButton.addEventListener('click', function() {
        const noteData = {
            title: noteTitleInput.value.trim(),
            text: noteTextInput.value.trim(),
        };
  
        if (!noteData.title || !noteData.text) {
            alert('Please fill out both the title and the note text fields.');
            return;
        }
  
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Note saved:', data);
            noteTitleInput.value = '';
            noteTextInput.value = '';
            updateButtonVisibility();
            // Provide feedback to the user
            alert('Note successfully saved!');
        })
        .catch((error) => {
            console.error('Error saving note:', error);
            // Provide feedback to the user
            alert('Failed to save note. Please try again.');
        });
    });
});
