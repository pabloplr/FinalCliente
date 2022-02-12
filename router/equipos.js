const express = require('express');
const router = express.Router();
const Equipo = require('../models/equipo_model');
const sesion = require('../public/js/sesion.js');


router.get('/', async (req,res) =>{
    const equiposDB = await Equipo.find();
    if(sesion.isLoged()){
        res.render('equipos',{
            equipos: equiposDB,
            error: false
        });
    }else{
        res.redirect('/login') //Volvemos al listado
    }    
});
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const equiposDB = new Equipo(body) //Creamos un nuevo Pokemon, gracias al modelo
        await equiposDB.save() //Lo guardamos con .save(), gracias a Mongoose
        if(sesion.isLoged()){
            res.redirect('/equipos') //Volvemos al listado
        }else{
            res.redirect('/login') //Volvemos al listado
        }
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const equiposDB = await Equipo.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        if(sesion.isLoged()){
            res.render('detalle_equipo', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
                equipo: equiposDB,
                error: false
            })
        }else{
            res.redirect('/login') //Volvemos al listado
        }
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle_equipo', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Partido no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const equiposDB = await Equipo.findByIdAndDelete({ _id: id });
        console.log(equiposDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!equiposDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el equipo.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'equipo eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
});
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const equiposDB = await Equipo.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(equiposDB)
        res.json({
            estado: true,
            mensaje: 'equipo editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el equipo'
        })
    }
});
module.exports = router;