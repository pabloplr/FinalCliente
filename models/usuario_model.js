const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    user: String,
    pass: String
})

const Usuario = mongoose.model('users', usuarioSchema, "users");

module.exports = Usuario;