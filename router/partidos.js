const express = require('express');
const router = express.Router();
const Partido = require('../models/partido_model');
const Equipo = require('../models/equipo_model');
const sesion = require('../public/js/sesion.js');

//al entrar en /lista_partidos
router.get('/', async (req, res) => {
    try {
        if(sesion.isLoged()){
            const listaPartidosDB = await Partido.find();
            console.log(listaPartidosDB);
            res.render("lista_partidos", { 
                listaPartidos: listaPartidosDB
            })
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        console.error(error)
    }
})

//al entrar en /crear_partido
router.get('/crear_partido', async (req,res) =>{
    const equiposDB = await Equipo.find();
    if(sesion.isLoged()){
        res.render('crear_partido',{
            equipos: equiposDB,
            error: false
        });
    }else{
        res.redirect('/login')
    }    
});

//al entrar en /equipos
router.get('/equipos', async (req,res) =>{
    const equiposDB = await Equipo.find();
    if(sesion.isLoged()){
        res.render('equipos',{
            equipos: equiposDB,
            error: false
        });
    }else{
        res.redirect('/login') 
    }    
});

// al añadir un partido
router.post('/', async (req, res) => {
    const body = req.body 
    try {
        const partidosDB = new Partido(body)
        await partidosDB.save()
        res.redirect('/lista_partidos')
    } catch (error) {
        console.log('error', error)
    }
})

//al entrar en los detalles de un partido
router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const equiposDB = await Equipo.find();
        const partidosDB = await Partido.findOne({ _id: id })
        res.render('detalle_partido', {
            partido: partidosDB,
            equipos: equiposDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle_partido', {
            error: true,
            mensaje: 'Partido no encontrado!'
        })
    }
})

// al pulsar en borrar en os detalles de un partido
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const partidos_DB = await Partido.findByIdAndDelete({ _id: id });
        console.log(partidos_DB)
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


//  al editar un partido
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