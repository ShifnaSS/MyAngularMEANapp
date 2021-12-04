const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user4:user4@cluster0.hypiv.mongodb.net/AngularLIB?retryWrites=true&w=majority');//'mongodb://localhost:27017/MyLibraryMain'

const schema = mongoose.Schema;

const BookSchema = new schema({
    bookname : String,
    authorname : String,
    genre : String,
    year  : Number,
    image : String
});

var book = mongoose.model('books',BookSchema);
module.exports = book;