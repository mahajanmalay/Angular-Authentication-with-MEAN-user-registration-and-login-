mongoose = require('mongoose');
Schema = mongoose.Schema;
userSchema = new Schema({
    email : String,
    password: String
})
module.exports = mongoose.model('user',userSchema,'users');