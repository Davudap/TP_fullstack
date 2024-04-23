require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, password:cryptoPass })
    
    if (result){
            // retorno token
            //jwt.sign('payload','secret_key','options')
            //Creo un token con un limite de 2hs
            const token = jwt.sign({email: email, password: password}, 'secret_key', {expiresIn:"2h"});    
            return token;
    }
    return null; // retorno 

}

module.exports = {login}