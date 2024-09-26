
// Clase y constructor que contiene la tarea 
class Tarea {
    constructor(id, fecha, titulo, descripcion, prioridad) {
        this.id = id;
        this.fecha = fecha;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    }

    agregar() {
        document.getElementById("registrarTarea").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const id = Math.floor(Math.random() * 10000) + 1; // Genera un ID 
            const fecha = e.target.elements["fecha"].value;
            const titulo = e.target.elements["titulo"].value;
            const descripcion = e.target.elements["descripcion"].value;
            const prioridad = e.target.elements["prioridad"].value;
            
            
            try{
                const respuesta = await fetch('registrar-tarea', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            fecha: fecha,
                            titulo: titulo,
                            descripcion: descripcion,
                            prioridad: prioridad
                            })
                            });
                            const datos = await respuesta.json();
                            console.log(datos);
                            alert("Tarea registrada con exito");
                            document.getElementById("registrarTarea").reset();
                            } catch (error) {
                            
                            }
                        });
        }
            
                                
    mostrarTareas() {
        
        

        // Aquí debes definir cómo mostrar las tareas. Puede ser renderizando en el DOM o llamando a una API
        console.log("Función mostrarTareas() pendiente de implementación.");
    }
}

// Instanciamos la clase y llamamos al método agregar()
const tarea = new Tarea();
tarea.agregar();

            
 /*       // Llamado a la instancia para obtener valores en variable
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

        // Recorrer el array para crear celdas de la tabla
        for (let i = 0; i < columnas.length; i++) {
            let columna = document.createElement('td');
            columna.textContent = columnas[i];
            crearFila.appendChild(columna);
        }

        listarRegistro.appendChild(crearFila);
*/
