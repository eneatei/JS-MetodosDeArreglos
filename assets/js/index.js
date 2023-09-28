// Variables
const tbody = document.querySelector("tbody");
const total = document.querySelector("#tareasTotal");
const tareas = [];
let tareasRealizadas = 0;

// agregar tarea
const agregarTarea = () => {
  const input = document.querySelector("#input");
  const nuevaTarea = {
    id: Date.now(),
    nombreTarea: input.value,
    realizada: false,
  };
  tareas.push(nuevaTarea);
  renderTable();
  input.value = "";
};

// render tabla
const renderTable = () => {
  tbody.innerHTML = "";
  tareasRealizadas = 0;
  tareas.forEach((tarea) => {
    const nuevaTarea = `<tr>
      <td>${tarea.id}</td>
      <td>${tarea.nombreTarea}</td>
      <td><input type="checkbox" class="checkbox" id="checkbox_${tarea.id}" ${tarea.realizada ? 'checked' : ''}></td>
      <td><button onclick="eliminar(${tarea.id})">eliminar</button></td>
    </tr>`;
    tbody.innerHTML += nuevaTarea;
    if (tarea.realizada) {
      tareasRealizadas++;
    }
  });
  total.textContent = tareas.length;
  document.querySelector("#tareasRealizadas").textContent = tareasRealizadas;
};

// tarea realizada
const cambiarEstadoRealizada = (id) => {
  const tarea = tareas.find((t) => t.id == id);
  if (tarea) {
    tarea.realizada = !tarea.realizada;
    if (tarea.realizada) {
      tareasRealizadas++;
    } else {
      tareasRealizadas--;
    }
    renderTable();
  }
};

// eliminar tarea
const eliminar = (id) => {
  const posicion = tareas.findIndex((tarea) => tarea.id == id);
  if (posicion !== -1) {
    if (tareas[posicion].realizada) {
      tareasRealizadas--;
    }
    tareas.splice(posicion, 1);
    renderTable();
  }
};

// agregar tarea
const botonAgregar = document.querySelector("#btn-agregar");
botonAgregar.addEventListener("click", agregarTarea);

// checkbox
tbody.addEventListener("click", (event) => {
  if (event.target.type === "checkbox") {
    const id = event.target.id.replace("checkbox_", "");
    cambiarEstadoRealizada(id);
  }
});

// tabla
renderTable();
