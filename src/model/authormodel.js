const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user4:user4@cluster0.hypiv.mongodb.net/AngularLIB?retryWrites=true&w=majority');//'mongodb://localhost:27017/MyLibraryMain'

const schema = mongoose.Schema;

const AuthorSchema = new schema({
    authorname : String,
    nation : String,
    genre : String,
    work  : String,
    image : String
});

var author = mongoose.model('authors',AuthorSchema);
module.exports = author;