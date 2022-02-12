const express = require('express');
const router = express.Router();
const sesion = require('../public/js/sesion.js');

// al pulsar en el btn de log out
router.get('/', (req, res) => {
    sesion.setLogout();
    res.redirect('/')
})

module.exports = router;