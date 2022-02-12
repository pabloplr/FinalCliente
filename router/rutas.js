const express = require('express') //Requerimos Express
const router = express.Router();
const sesion = require('../public/js/sesion.js');

router.get('/', (req, res) => {
    if(sesion.isLoged()){
        res.render("index", { titulo: "mi titulo dinámico" })
    }else{
        res.redirect('/login')
    } 
})
module.exports = router;