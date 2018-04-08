//3-rd party packages
const yargs = require('yargs');

//external files
const notes = require('./notes');

var titleOptions = {
    demand: true,
    alias: 't',
    describe: 'Title of a note'
};

var bodyOptions = {
    demand: true,
    alias: 'b',
    describe: 'Main content of note'
}
var argv = yargs
.usage("Use me like this: node app.js [add/remove/read/list] [title] [body]")
.command('add','Add a new note',{
    title: titleOptions,
    body : bodyOptions
})
.command('remove','removes note from notes',{
    title: titleOptions
})
.command('read','Read a note',{
    title: titleOptions
})
.command('list','list all the notes')
.help()
.alias('help','h')
.argv;

command = argv._[0];

if(command === 'add'){
    var note = notes.addNote(argv.title,argv.body);
    if(note){
        notes.logNote(note);
    }else{
        console.log('Note already exist');
    }
}else if(command === 'remove'){
    var note = notes.removeNote(argv.title);
    var message = note ? 'Note was removed' : 'Note not found';
    console.log(message);
}else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    }else{
        console.log('Note with that title is not found');
    }
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`There are ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));    
}else{
    console.log('Command not found');
}