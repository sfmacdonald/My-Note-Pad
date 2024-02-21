# My-Note-Pad
Write and save notes to a virtual note pad

## Table of Contents

- [Project Name](#sql-employee-tracker)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)

## Description

The purpose of the web application is to write and save notes leveraging Express.js and utilizing JSON files to save and retrieve notes. Users may also delete notes at their discretion. The application is deployed via Heroku.

## Features

This web-based app has the following features and functions:

1. Create a new note and save.
2. View previously saved notes.
3. Delete a previously saved note.

## Usage

The github repository may be found at https://github.com/sfmacdonald/My-Note-Pad

The live URL for the working website deployed via Heroku is https://my-note-pad-7177df64e9dd.herokuapp.com

When accessed, the initial landing page should reflect the following image: 
![My Note Pad](</Users/Mac/bootcamp/My-Note-Pad/public/assets/images/Screenshot 2024-02-21 at 12.51.14 PM.png>)

## Testing

Testing may be accomplished manually by:

1. Navigating to the application at https://my-note-pad-7177df64e9dd.herokuapp.com
2. Enter text into the "Note Title" and "Note Text" fields.
    - If either field does not have data entered, the application shall display a message to the user that the note cannot be saved without completing the action.
    - If the user has filled in the data  correctly, clicking on the "Save Note" button shall display a successful message and refresh the page with the newly entered note and any other existing notes displayed for the user
    - If the user does not wish to save the contents, selecting the "Clear Form" button to remove the data.
3. To delete an existing note, select the trashcan icon next to the note that is desired to be removed. The note shall be removed from the application and the database.