const express = require('express') //Requerimos Express
const router = express.Router();
const sesion = require('../public/js/sesion.js');

// Ahora, CORTAMOS del fichero principal 01-express.js
// las dos rutas que tenemos: la principal ( / ) y la 
// de contactos ( /contaco )
// Importante que ya no usaremos el app.get(...), ahora
//vamos a utilizar las rutas, por lo que deberemos poner:
router.get('/', (req, res) => {
    if(sesion.isLoged()){
        res.render("index", { titulo: "mi titulo dinámico" })
    }else{
        res.redirect('/login') //Volvemos al listado
    } //Volvemos al listado
})

// router.get('/contacto', (req, res) => {
//     res.render("contacto", { tituloContacto: "Estamos en contacto de manera dinámica!!" })
// })
// Por último, vamos a exportarlo:
module.exports = router;