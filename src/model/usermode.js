const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user4:user4@cluster0.hypiv.mongodb.net/AngularLIB?retryWrites=true&w=majority');//'mongodb://localhost:27017/MyLibraryMain'

const schema = mongoose.Schema;

const UserSchema = new schema({
    username : String,
    phone : Number,
    emailID : String,
    pass1  : String,
    pass2 : String
});

var user = mongoose.model('users',UserSchema);
module.exports = user;