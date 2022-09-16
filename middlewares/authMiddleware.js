const jwt = require('jsonwebtoken');
const User = require('../models/User');


const signature = process.env.SECRET_KEY;


const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    console.log(token);

    if(token){
        jwt.verify(token, signature, (err , decodedToken) =>{
            if( err ) {
                res.redirect('/login');
            }else{
                console.log(decodedToken)
                next();
            }
        } )
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) =>{

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, signature, async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
            
        })
    }else{
        res.locals.user = null;
        next();
    }
}


module.exports = {requireAuth, checkUser};