const express  = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// definir el esquema de la tarea en Schema
const tareaSchema = new Schema({
    id : {type:String,required:true},
    fecha : {type:String, required:true},
    titulo : {type:String, required:true},
    descripcion : {type:String, required:true},
    prioridad : {type:Boolean, required:true}
    });

//crear el modelo de la tarea
const Tarea = mongoose.model('Tarea', tareaSchema);

//ruta para agregar una nueva tarea
router.post ('/', async(req,res) =>{
    const tarea = new modeloTarea({
        id : req.body.id,
        fecha : req.body.fecha,
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        prioridad : req.body.prioridad
        });
        try{

            const tareaGuardada = await tarea.save();
            res.json(tareaGuardada);
            }
            catch(error){
                res.status(400).json({message: error.message});
                }
    });


module.exports = router;            


