const express = require('express');
const router = express.Router();
const Partido = require('../models/partido_model');
const Equipo = require('../models/equipo_model');
const sesion = require('../public/js/sesion.js');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        if(sesion.isLoged()){

            const listaPartidosDB = await Partido.find();
            console.log(listaPartidosDB);
            res.render("lista_partidos", { 
                listaPartidos: listaPartidosDB
            })
        }else{
            res.redirect('/login') //Volvemos al listado
        }
    } catch (error) {
        console.error(error)
    }
})
router.get('/crear_partido', async (req,res) =>{
    const equiposDB = await Equipo.find();
    if(sesion.isLoged()){
        res.render('crear_partido',{
            equipos: equiposDB,
            error: false
        });
    }else{
        res.redirect('/login') //Volvemos al listado
    }    
});
router.get('/equipos', async (req,res) =>{
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
        let rodrigo = {
            nombre: "pino",
            tipo: "huele",
            descripcion: "watafaa",
            apodo: "rodrigo"
        }
        const partidosDB = new Partido(body) //Creamos un nuevo Pokemon, gracias al modelo
        await partidosDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/lista_partidos') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const equiposDB = await Equipo.find();
        const partidosDB = await Partido.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(partidosDB) //Para probarlo por consola
        res.render('detalle_partido', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            partido: partidosDB,
            equipos: equiposDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle_partido', { //Mostraremos el error en la vista "detalle"
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
        const partidos_DB = await Partido.findByIdAndDelete({ _id: id });
        console.log(partidos_DB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!partidos_DB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el partido.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'partido eliminado.'
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
        const partidosDB = await Partido.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(partidosDB)
        res.json({
            estado: true,
            mensaje: 'partido editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el partido'
        })
    }
});

module.exports = router;