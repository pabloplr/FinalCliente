const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    user: String,
    pass: String
})

//Creamos el modelo
const Usuario = mongoose.model('users', usuarioSchema, "users");

module.exports = Usuario;