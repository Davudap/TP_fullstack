const jwt = require('jsonwebtoken');

const verify = (req,res,next) =>{

    const token = req.headers['authorization']
    
    try {
        const decode =  jwt.verify(token.split(' ')[1],"secret_key");
        next();
    }catch(error){
        res.status(401).send("No autorizado");
    }     
}

module.exports = {verify}