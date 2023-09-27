const mongoose = require('mongoose');
const {isEmail} = require('validator');

mongoose.pluralize(false);

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required: [true, 'Please enter a password'],
        minlength: [6,'Minimum password length is 6 characters']
    },
    type:String
});

const User = mongoose.model('users', userSchema);

module.exports = User;