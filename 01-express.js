const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000; 

//Conexión a base de datos
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ xtended: false}));
app.use(bodyParser.json());
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.cswbn.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


//motor de plantillas
app.set('view engine', 'ejs'); 

app.set('views', __dirname+'/views');

app.use(express.static(__dirname + '/public'));

//llamadas a rutas
app.use('/',require('./router/rutas'));
app.use('/lista_partidos',require('./router/partidos'));
app.use('/login',require('./router/login'));
app.use('/logout',require('./router/logout'));
app.use('/equipos',require('./router/equipos'));
app.use((req,res)=>{
  res.status(404).render("404", {titulo: "error 001: "});
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})