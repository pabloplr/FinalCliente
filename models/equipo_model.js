const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipoSchema = new Schema({

    nombre: String,
})

const Equipo = mongoose.model('equipos', equipoSchema, "equipos");

module.exports = Equipo;