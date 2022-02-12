const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipoSchema = new Schema({

    nombre: String,
})

//Creamos el modelo
const Equipo = mongoose.model('equipos', equipoSchema, "equipos");

module.exports = Equipo;