const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const pelucheModel = require('../models/peluches.js')

const usrSchema = new Schema({
    
    email:{
        type: String,
        required:true,
        index: {unique: true, dropDups: true}
    },

    name:{
        type: String,
        required:true
    },

    lastname:{
        type: String,
        required:true
    },

    password:{
        type: String,
        required:true
    }

}, {timestamps: true}).set('toJson',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});

const usrModel = mongoose.model('usuario', usrSchema);
module.exports = usrModel;

