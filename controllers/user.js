require('mongoose')
const usrModel = require('../models/user')

const addUser = async (name, lastname, email, password) =>{
    
    // Verificamos primero si existe el usuario
    let existUser = await usrModel.findOne({email:email});
    console.log(existUser);

    // Si no existe, lo creamos
    if(!existUser){

        const cryptoPass =  require('crypto')
                            .createHash('sha256')
                            .update(password)
                            .digest('hex');
        
        const usr = new usrModel({
            name:       name,
            lastname:   lastname,
            email:      email,
            password:   cryptoPass
        });

        let user = await usr.save();

        console.log('\nusuario nuevo');
        console.log(user);
        return {user};
    }
    else{
        return false;
    }
}



module.exports = { addUser }