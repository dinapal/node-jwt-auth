const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Please Enter min 6 character']
    }
})

// Validate the password 

userSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})


// static model for login user 

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
       const auth = await bcrypt.compare(password, user.password);

       if(auth === true){
        return user;
       }
       throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}


const User = mongoose.model('users', userSchema);

module.exports = User;