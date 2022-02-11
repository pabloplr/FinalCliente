const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000; 

//Conexión a base de datos
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ xtended: false}));
app.use(bodyParser.json());
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credencialesd
// const user = 'pablo_lopez';
// const password = 'Q2eeKMI6K83JcmLA';
// const dbname = 'bd_pokemon';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.cswbn.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


app.set('view engine', 'ejs'); //motor de plantillas
app.set('views', __dirname+'/views');

app.use(express.static(__dirname + '/public'));//mi raiz del proyecto es public
//llamadas a rutas
app.use('/',require('./router/rutas'));
app.use('/golems',require('./router/golems'));
app.use('/administrar_golems',require('./router/administrar_golems'));
app.use('/pokemon',require('./router/pokemon'));
app.use((req,res)=>{
  res.status(404).render("404", {titulo: "error 001: "});
    // res.status(404).sendFile(__dirname + "/public/404.html");
});
// app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
//<zadf