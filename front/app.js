// clase y constructor que contenga la tarea 
class Tarea{
    constructor(id, fecha, titulo, descripcion, prioridad){
        this.id = id;
        this.fecha = fecha;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    };
};

// crear valores aleatorios para el ID
function generarId(){
    return Math.floor(Math.random() * 10000) + 1;
    }


//pasar los valores de la clase tarea a la instancia (funcion) crearTarea
function crearTarea (){
let id = generarId();
let fecha = document.getElementById('fecha').value;
let titulo = document.getElementById('titulo').value;
let descripcion = document.getElementById('descripcion').value;
let prioridad = document.getElementById('prioridad').value;

    //crear una nueva tarea con los nuevos valores 
    return new Tarea(id, fecha, titulo, descripcion, prioridad);
}

function guardarTarea(){
    alert('Tarea guardada con exito!')
    //llamado a la instancia para obtener valores en variable
    let valoresTarea = crearTarea();

    //obtengo el elemento donde voy a mostrar las tareas
    let listarRegistro = document.getElementById('mostrarRegistros')
    
    //creo la fila para mostrar cada tarea
    crearFila = document.createElement('tr')
    
    //creo las columnas en un array para cada atributo de la tarea
    let columnas=[
        valoresTarea.id,
        valoresTarea.fecha,
        valoresTarea.titulo,
        valoresTarea.descripcion,
        valoresTarea.prioridad
    ]

    for (let i=0; i<=columnas.length; i++){
        let columna = document.createElement('td');
        columna.textContent = columnas[i];
        crearFila.appendChild(columna);
    }
    listarRegistro.appendChild(crearFila);

}
