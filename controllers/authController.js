const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('../config/database');
const User = require('../models/User');
const {userErrorHandler} = require('../errors/authErrors');
const signature = process.env.SECRET_KEY;


// Custom Function 
const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) =>{
    return jwt.sign({id},signature, {
        expiresIn: maxAge
    }  )
}


// Signup Controller
module.exports.SignUpPost = async (req, res) =>{
    const {email , password } = req.body;
    try{
        const user = await User.create({email, password})
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id});
        console.log(user);


    }catch(err){
     const error = userErrorHandler(err);
     res.status(400).json({errors: error});
    }
}

module.exports.SignUpGet = (req, res) =>{
    res.render('signup');
}

// Login Controller

module.exports.loginPost = async (req, res) =>{
    const { email, password} = req.body;
    
    try{
        const user = await User.login(email, password);
        console.log(user);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    }
    catch(err){
        console.log(err)
        const error = userErrorHandler(err);
        console.log(error);
        res.status(400).json({errors: error})
    }
}

module.exports.loginGet = (req, res) =>{
    res.render('login')
}


module.exports.logOutGet = (req, res) =>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
