const express = require('express');
const router = express.Router();
const Golem = require('../models/golem');

router.get('/', async (req, res) => {
    try {
        const arrayGolems = await Golem.find();
        res.render("administrar_golems", {
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
        res.redirect('/administrar_golems') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const golems_bd = await Golem.findByIdAndDelete({ _id: id });
        console.log(golems_bd);
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!golems_bd) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el golem.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'golem eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;