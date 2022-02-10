const express = require('express');
const router = express.Router();
const Golem = require('../models/golem');
// const Pokemon = require('../models/pokemon');

router.get('/', async (req, res) => {
    try {
        const arrayGolems = await Golem.find();
        res.render("golems", {
            array_golems: arrayGolems 
        })
    } catch (error) {
        console.error(error)
    }
});
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const golems_array_bd = new Golem(body) //Creamos un nuevo Pokemon, gracias al modelo
        await golems_array_bd.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/golems') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
module.exports = router;