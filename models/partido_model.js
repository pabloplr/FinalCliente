const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidoSchema = new Schema({

    equipo1: String,
    equipo2: String,
    res_equipo1: String,
    res_equipo2: String
})

//Creamos el modelo
const Partido = mongoose.model('partidos', partidoSchema, "partidos");

module.exports = Partido;