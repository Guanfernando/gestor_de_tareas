// conexion con la base de datos por mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tareas');

const tareasdb = mongoose.connection;

tareasdb.on('connected', ()=> 
    {console.log('Conexion correcta a Base de Datos', tareasdb)});
tareasdb.on('error', ()=>
    {console.log ('Error de conexion a BD')});
