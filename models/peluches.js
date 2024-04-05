const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const pelucheSchema = new Schema({
    color: { 
        type: String, 
        enum: ['rosa', 'amarillo', 'verde'], 
        required: true 
    },
    tipo: { 
        type: String,
        enum: ['oso', 'conejo', 'perro', 'mapache', 'gato'], 
        required: true 
    },
    accesorio: {
        type: String, 
        enum: ['camiseta y pelota de futbol', 'guitarra electrica', 'notebook'], 
        required: true 
    },
    email_propietario: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

const pelucheModel = mongoose.model('peluche', pelucheSchema);
module.exports = pelucheModel;