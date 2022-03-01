const express = require('express') //Requerimos Express
const router = express.Router();
const sesion = require('../public/js/sesion.js');

//al entrar en raiz
router.get('/', (req, res) => {
    if(sesion.isLoged()){
        res.render("index", { titulo: "NBA" })
    }else{
        res.redirect('/login')
    } 
})
module.exports = router;