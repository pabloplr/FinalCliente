const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golemSchema = new Schema({

    name: String,
    link_img: String,
    price: Number,
    attributes: Array
})

//Creamos el modelo
const Golem = mongoose.model('golems', golemSchema, "golems");//(tabla, var schema, tabla)

module.exports = Golem;