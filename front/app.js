
// Clase y constructor que contiene la tarea 
class Tarea {
    constructor(id, fecha, titulo, descripcion, prioridad) {
        this.id = id;
        this.fecha = fecha;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    }
}

// Crear valores aleatorios para el ID
function generarId() {
    return Math.floor(Math.random() * 10000) + 1;
}

// Pasar los valores de la clase Tarea a la instancia (función) crearTarea
function crearTarea() {
    let id = generarId();
    let fecha = document.getElementById('fecha').value;
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let prioridad = document.getElementById('prioridad').value;

    // Crear una nueva tarea con los valores ingresados
    return new Tarea(id, fecha, titulo, descripcion, prioridad);
}

function guardarTarea() {
    alert('Tarea guardada con éxito!');

    // Llamado a la instancia para obtener valores en variable
    let valoresTarea = crearTarea();

    // Obtengo el elemento donde voy a mostrar las tareas
    let listarRegistro = document.getElementById('mostrarRegistros');
    
    // Creo la fila para mostrar cada tarea
    let crearFila = document.createElement('tr');

    // Creo las columnas para cada atributo de la tarea
    let columnas = [
        valoresTarea.id,
        valoresTarea.fecha,
        valoresTarea.titulo,
        valoresTarea.descripcion,
        valoresTarea.prioridad
    ];

    // Enviar datos al servidor
    fetch('/api/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: valoresTarea.id,
                fecha: valoresTarea.fecha,
                titulo: valoresTarea.titulo,
                descripcion: valoresTarea.descripcion,
                prioridad: valoresTarea.prioridad
                })
                })
                .then(response => response.json())
                .then(data => console.log(data))


    // Recorrer el array para crear celdas de la tabla
    for (let i = 0; i < columnas.length; i++) {
        let columna = document.createElement('td');
        columna.textContent = columnas[i];
        crearFila.appendChild(columna);
    }

    listarRegistro.appendChild(crearFila);
}
