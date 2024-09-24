const express = require('express');
const app = express();

// importar la conexion a mongoDB
const registroDB  = require('./conexion');

//importar el archivo de las rutas y el modelo de la tarea
const rutaTarea = require('./rutas/tareas');

//importar el body parser para manejar solicitudes HTTP
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//usar ruta para las tareas 
app.use ('/api/tareas',rutaTarea);

app.get ('/', (req ,res) => {
        res.end('Servidor de Backend NODEJS para Gstor de Tareas');
    })

//configuracion del sevidor
const PORT = 5000
app.listen(PORT, function(){
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
});


