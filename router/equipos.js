const express = require('express');
const router = express.Router();
const Equipo = require('../models/equipo_model');
const sesion = require('../public/js/sesion.js');

// al entrar en /equipo
router.get('/', async (req,res) =>{
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

//al añadir un equipo
router.post('/', async (req, res) => {
    const body = req.body //
    console.log(body) 
    try {
        const equiposDB = new Equipo(body) 
        await equiposDB.save() 
        if(sesion.isLoged()){
            res.redirect('/equipos') 
        }else{
            res.redirect('/login') 
        }
    } catch (error) {
        console.log('error', error)
    }
})

// al clicar en editar un equipo
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const equiposDB = await Equipo.findOne({ _id: id }) 
        if(sesion.isLoged()){
            res.render('detalle_equipo', { 
                equipo: equiposDB,
                error: false
            })
        }else{
            res.redirect('/login') 
        }
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('detalle_equipo', { 
            error: true,
            mensaje: 'Partido no encontrado!'
        })
    }
})

// cuando borramos un equipo
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const equiposDB = await Equipo.findByIdAndDelete({ _id: id });
        console.log(equiposDB)
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

//cuando editamos un equipo
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