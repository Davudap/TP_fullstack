require('mongoose')
const usrModel      = require('../models/user')
const pelucheModel  = require('../models/peluches');

const addPeluche = async (color, tipo, accesorio, email_propietario) =>{

    // Verificamos primero si existe el usuario
    let existUser = await usrModel.findOne({email:email_propietario});


    if(!existUser){
        return false;
    }

    else{
        const pelu = new pelucheModel({
            color:              color,
            tipo:               tipo,
            accesorio:          accesorio,
            email_propietario:  email_propietario,
        })

        let peluche = await pelu.save();
        console.log('\npeluche nuevo');
        console.log(peluche);
        return {peluche};
    }

}

const deletePeluche = async (id) =>{
    const result = await pelucheModel.findByIdAndDelete(id);
    
    if(!result){
        return false;
    }
    else{
        console.log('\npeluche eliminado')
        console.log(result)
        return result;
    }
    
}

const updatePeluche = async (peluche) =>{

    const result = await pelucheModel.findByIdAndUpdate(peluche._id, peluche, {runValidators: true, returnOriginal: false});

    if(!result){
        return false;
    }
    else{
        console.log('\npeluche actualizado')
        console.log(result)
        return result;
    }

}

const getPeluchesPropietario = async (email_propietario)=>{
    const result = await pelucheModel.find({email_propietario: email_propietario});

    return result;
}

const getTopPeluches = async () => {
    
    const limit = 3

    const result = await pelucheModel.aggregate([
        // Agrupar por tipo de peluche y contar cuántas veces aparece cada tipo
        { $group: { _id: "$tipo", total: { $sum: 1 } } },
        // Ordenar los peluches en orden descendente según la cantidad total de veces elegidos
        { $sort: { total: -1 } },
        // Limitar a los 3 primeros peluches
        { $limit: limit }
      ]);

      return result;

}

module.exports = { addPeluche, deletePeluche, updatePeluche, getPeluchesPropietario, getTopPeluches }