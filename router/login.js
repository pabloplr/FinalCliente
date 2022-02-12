const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario_model');
const Partido = require('../models/partido_model');
const sesion = require('../public/js/sesion.js');

router.get('/', (req, res) => {
    res.render("login", { titulo: "login" })
})


router.post('/', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    // const body = req.body
    // const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    const user1 = req.body.user //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    const pass1 = req.body.pass //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        // const equiposDB = await Usuario.findOne({ _id: id }) //_id porque así lo indica Mongo
        // const equiposDB = await Usuario.findOne({ user: user1, pass: pass1 }) //_id porque así lo indica Mongo
        const equiposDB = await Usuario.find({ user: user1, pass: pass1 }).exec()//_id porque así lo indica Mongo
        // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log("el login de klos huevos puto sonrixzsas de los cojones,. me tiene hasta la poya: ", equiposDB);
        if(equiposDB.length > 0){//usuario weno
            sesion.setLog();
            res.redirect('/') //Volvemos al listado
        } else {
            res.render('login', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
                error: false
            })
        }
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('login', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Partido no encontrado!'
        })
        // res.redirect('/lista_partidos') //Volvemos al listado
    }
})
module.exports = router;