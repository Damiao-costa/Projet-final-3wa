const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge= 3*24*60*60;

//handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }
    
    //validation error
    if(err.message.includes('users validation failed:')){
        console.log(Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        }));
    } 
    return errors;
};

const createToken = (id) => {
    
    return jwt.sign({ id }, 'storeSecretJwtTokenForSecurity', {
        expiresIn: maxAge,
    });
}

module.exports.signup_get = async (req,res) => {

}
module.exports.login_get = async (req,res) => {

}
module.exports.signup_post = async (req,res) => {
    const{ email, password}= req.body;

    try {
        const user = await User.create({ email, password,type:'user'});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req,res) => {
    const{email, password}= req.body;

    try {
        const user = await User.create({ email, password,type:'user'});
        res.status(201).json(user);
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}