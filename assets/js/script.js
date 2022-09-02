//paso 1 generar array vacio que guarda todos los datos que agrege
const tareas = [
    {id:1, descripcion: 'Escuchar música', realizada: 'true'}, 
];

/* paso 2 crear función generarTareas, definir variable template vacía y recorrer la lista con el método forEach */

const generarTareas = ()=>{
    let template = '';
        tareas.forEach(tarea => {
            template += 
            `<tr>
                <td>${tarea.id}</td>
                <td>${tarea.descripcion}</td>
                <td><input type="checkbox" ${tarea.realizada ? "checked" : ""}></td>
               <td><button> X </button></td>
            </tr>`
        });

//paso 3 selecionar y cargar el listado en el dom
    const tableBody = document.querySelector('#listaDeTareas tbody');
    tableBody.innerHTML = template;

/* paso 4 llamar a la función borrar, a la función estadoDeLaTarea para poder eliminar un elemento de la lista y alternar y llamar a la función contarLasTareas cuando se recarge la lista */
    borrar();
    estadoDeLaTarea();
    contarLasTareas();
}

/* paso 5 crear función borrar, recorrer el método forEach y elmiminar un elemento con el método .splice */
const borrar = ()=> {
    const eliminar = document.querySelectorAll('#listaDeTareas button');
    eliminar.forEach((btn, index)=>{
        btn.addEventListener('click', ()=>{
            tareas.splice(index, 1);

            generarTareas();
        });
    });
};

/* paso 6 crear la función estadoDeLaTarea para actuallizar nuevo valores true o flase */
const estadoDeLaTarea = ()=>{
    //seleccionado el selector de atributo 
    const checks = document.querySelectorAll("#listaDeTareas input[type='checkbox']");
    checks.forEach((check, index)=>{
        const fila = document.querySelector(`#listaDeTareas tbody tr:nth-child(${index + 1})`
        );

        if(check.checked){
            fila.classList.add('bold');
        }
    
        check.addEventListener('click', ()=>{
            fila.classList.toggle('bold');
            tareas[index].realizada = !tareas[index].realizada;
            //llama a la función para marcar un checkbox
            contarLasTareas();
        });
    });
}

//paso 7 crear la función contarLasTareas
const contarLasTareas = ()=>{
    const totalTareas = tareas.length
    const tareasRealizadas = tareas.filter((tarea) => tarea.realizada === true).length

    const total = document.getElementById('total');
    const realizada = document.getElementById('realizadas');

    total.innerHTML = totalTareas
    realizada.innerHTML = tareasRealizadas
}

const btn = document.getElementById('boton');
btn.addEventListener('click', ()=>{

    //capturar input
    const tarea = document.getElementById('agregarTarea');
    
    //enviar el valor al array de tareas
    tareas.push(
        {id: tareas.length + 1, descripcion: tarea.value, realizada: false}
    );
    
    //limpiar el input
    tarea.value = "";
    
    generarTareas();
});

//mostrar las tareas
generarTareas();

















