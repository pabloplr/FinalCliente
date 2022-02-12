const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario_model');
const Partido = require('../models/partido_model');
const sesion = require('../public/js/sesion.js');


//al entrar en /login
router.get('/', (req, res) => {
    res.render("login", { titulo: "login" })
})

// al hacer login
router.post('/', async(req, res) => { 
    const user1 = req.body.user
    const pass1 = req.body.pass
    try {
        const equiposDB = await Usuario.find({ user: user1, pass: pass1 }).exec()
        if(equiposDB.length > 0){//el usuario existe en bbdd
            sesion.setLog();
            res.redirect('/') 
        } else {
            res.render('login', { 
                error: false
            })
        }
    } catch (error) { 
        console.log('Se ha producido un error', error)
        res.render('login', { 
            error: true,
            mensaje: 'Partido no encontrado!'
        })
    }
})
module.exports = router;