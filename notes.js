const fs = require('fs');

var fetchNotes = () => {
    try{
    var notes = fs.readFileSync('json.json');
    return JSON.parse(notes);
    }
    catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('json.json',JSON.stringify(notes));
};

var logNote = (note) => {
    console.log(`Note has Title : ${note.title} and Body : ${note.body}.`);
};

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    filteredNotes = notes.filter((note) => note.title === title);
    if(filteredNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    notes = fetchNotes();
    filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

var removeNote = (title) => {
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
};

module.exports = {
    addNote,
    getNote,
    getAll,
    logNote,
    removeNote
}