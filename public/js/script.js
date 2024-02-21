document.addEventListener('DOMContentLoaded', function() {
    const saveNoteButton = document.querySelector('.save-note');
    const newNoteButton = document.querySelector('.new-note');
    const clearFormButton = document.querySelector('.clear-btn');
    const noteTitleInput = document.querySelector('.note-title');
    const noteTextInput = document.querySelector('.note-textarea');
    
    // Function to fetch and render notes with a delete button
    function fetchNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => {
                const listGroup = document.getElementById('list-group');
                listGroup.innerHTML = ''; // Clear the list before adding new notes
                notes.forEach(note => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');
                    // Add note title and text content
                    const noteContent = document.createElement('span');
                    noteContent.textContent = `${note.title}: ${note.text}`;
                    li.appendChild(noteContent);

                    // Create and append the delete button to each note
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end');
                    deleteBtn.innerHTML = '<span class="fas fa-trash"></span>';
                    deleteBtn.addEventListener('click', function() {
                        li.remove();
                        // API call to delete the note from the backend
                    });
                    li.appendChild(deleteBtn);

                    listGroup.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching notes:', error));
    }
  
    // Initially fetch and render notes
    fetchNotes();
  
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
             // Refresh the page to reflect the addition of the new note
             window.location.reload();
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
