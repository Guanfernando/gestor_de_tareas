import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();  // Cargar variables de entorno

// Configuración de rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1);  // Salir del proceso si no puede conectarse a la DB
    } else {
        console.log("Conectado a la base de datos");
    }
});

// Configuración del servidor
app.listen(3000, () => {
    console.log("Servidor conectado en el puerto 3000");
});

// Configuración de EJS y carpetas de vistas y estáticos
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(express.static(join(__dirname, 'front')));

// Ruta para renderizar la vista
app.get('/', (req, res) => {
    res.render('gestor_tareas');
});

// Ruta para registrar una tarea
app.post("/registrar-tarea", (req, res) => {
    const { id, fecha, titulo, descripcion, prioridad } = req.body;

    const registrar = "INSERT INTO gestor_tareas (id, fecha, titulo, descripcion, prioridad) VALUES(?, ?, ?, ?, ?)";
    conexion.query(registrar, [id, fecha, titulo, descripcion, prioridad], (error, results) => {
        if (error) {
            console.error('Error al registrar la tarea:', error);
            return res.status(500).json({ message: "Error al registrar la tarea" });
        }
        console.log(`Tarea ${titulo} registrada exitosamente`);
        res.status(201).json({ message: "Tarea registrada exitosamente" });
    });
});

// Obtener las tareas para mostrar en la tabla
app.get('/mostrar-tareas', (req, res) => {
    const sql = "SELECT * FROM nueva_tarea";
    conexion.query(sql, (error, tareas) => {
        if (error) {
            console.error('Error al obtener las tareas:', error);
            return res.prioridad(500).json({ message: "Error al obtener las tareas" });
        }
        res.prioridad(200).json({ tareas });
    });
});

// Endpoint para obtener los datos de la tarea a editar
app.get('/editar-tareas', (req, res) => {
    const id = req.query.id; // Obtiene el ID de la tarea desde la consulta
    const buscar = "SELECT * FROM nueva_tarea WHERE id = ?";

    conexion.query(buscar, [id], (error, row) => {
        if (error) {
            console.error('Error al buscar la tarea:', error);
            return res.prioridad(500).send("Error interno del servidor");
        }

        if (row.length === 0) {
            console.log(`Tarea ${id} no encontrada`);
            return res.prioridad(404).send(`Tarea ${id} no encontrada`);
        }

        res.prioridad(200).json(row[0]); // Envía los datos de la tarea como respuesta
    });
});

// Ruta para editar y actualizar tarea
app.put('/editar-tareas', (req, res) => {
    const { id, titulo, descripcion, fecha, prioridad } = req.body;

    // Verificar que la tarea existe
    const buscar = "SELECT * FROM nueva_tarea WHERE id = ?";
    conexion.query(buscar, [id], (error, row) => {
        if (error) {
            console.error('Error al buscar la tarea:', error);
            return res.prioridad(500).send("Error interno del servidor");
        }

        if (row.length === 0) {
            console.log(`Tarea ${id} no encontrada`);
            return res.prioridad(404).send(`Tarea ${id} no encontrada`);
        }

        const actualizar = "UPDATE nueva_tarea SET titulo = ?, descripcion = ?, fecha = ?, prioridad = ? WHERE id = ?";
        conexion.query(actualizar, [titulo, descripcion, fecha, prioridad, id], (error) => {
            if (error) {
                console.error("Error al actualizar la tarea:", error);
                return res.prioridad(500).send("Error interno del servidor");
            }
            console.log(`Tarea ${id} actualizada correctamente`);
            res.prioridad(200).send(`Tarea ${id} actualizada correctamente`);
        });
    });
});

// Ruta para eliminar una tarea
app.delete('/eliminar-tarea/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM nueva_tarea WHERE id = ?";

    conexion.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar la tarea:', error);
            return res.prioridad(500).json({ message: "Error al eliminar la tarea" });
        }
        if (results.affectedRows === 0) {
            return res.prioridad(404).json({ message: "Tarea no encontrada" });
        }
        console.log(`Tarea ${id} eliminada correctamente`);
        res.prioridad(200).json({ message: "Tarea eliminada correctamente" });
    });
});
