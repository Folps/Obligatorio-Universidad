// Autores  - Felipe Iraola - 196542 - Juan Cabrera - 169448

window.addEventListener("load", inicio);

let sistema = new Sistema();
let donante = new Donante();
let donacion = new Donacion();

function inicio() {
  document
    .getElementById("bttnRegistro")
    .addEventListener("click", nuevoDonante);
  document
    .getElementById("bttnDonaciones")
    .addEventListener("click", nuevaDonacion);
  document
    .getElementById("radioordenDecre")
    .addEventListener("click", ordenarporMonto);
  document
    .getElementById("radioordenDecre")
    .addEventListener("select", ordenarporMonto);
  document
    .getElementById("radioordenCreciente")
    .addEventListener("click", ordenarporNombre);
  document
    .getElementById("radioordenCreciente")
    .addEventListener("select", ordenarporNombre);
  document
    .getElementById("bttnDonaciones")
    .addEventListener("click", mostrarTotalGeneral);
  document
    .getElementById("bttnDonaciones")
    .addEventListener("click", mostrarMayorDonacion);
  document
    .getElementById("bttnDonaciones")
    .addEventListener("click", drawChart, { passive: true });
}

function nuevoDonante() {
  //Se encarga de generar las donantes.
  if (document.getElementById("formularioDonantes").reportValidity()) {
    let nombre = document.getElementById("IdNombreDonante").value;
    let direccion = document.getElementById("IdDireccionDonante").value;
    let telefono = document.getElementById("IdTelefonoDonante").value;
    let cantdons = parseInt(0);
    if (sistema.donanteRepetido(nombre) === true) {
      sistema.agregarDonante(
        new Donante(nombre, direccion, telefono, cantdons)
      );
      cargarSelect();
      RegistroDonacionesReset();
    }
  }
}

function cargarSelect() {
  //Carga el Select con los donantes ingresados.
  let donantes = sistema.mostrarDonantes();
  let select = document.getElementById("IdNombreSelect");
  select.innerHTML = "";
  for (let i = 0; i < donantes.length; i++) {
    let nombreDonante = sistema.donantes[i].nombre;
    let nodoCombo = document.createElement("option");
    let nodo = document.createTextNode(nombreDonante);
    nodoCombo.appendChild(nodo);
    select.appendChild(nodoCombo);
  }
}

function RegistroDonacionesReset() {
  //Resetea los campos Nombre, Donante y Teléfono.
  document.getElementById("IdNombreDonante").value = "";
  document.getElementById("IdDireccionDonante").value = "";
  document.getElementById("IdTelefonoDonante").value = "";
  document.getElementById("IdTelefonoDonante").value = "";
}

function nuevaDonacion() {
  //Se encarga de generar las donaciones.
  if (document.getElementById("idMonto").reportValidity()) {
    let donante = sistema.donanteAString();
    let modo = document.getElementById("idModo").value;
    let monto = parseInt(document.getElementById("idMonto").value);
    let comentarios = document.getElementById("idComentario").value;
    if (donante != null) {
      sistema.agregarDonacion(new Donacion(donante, modo, monto, comentarios));
      SumaDons();
      DonacionesMayorCantidad();
      ordenarporMonto();
      totalDonaciones();
      promedioDonaciones();
      DonacionesReset();
    } else {
      alert("Es necesario cargar un usuario");
    }
  }
}

function SumaDons() {
  // Suma una donacion al donante.
  let cantdons = sistema.sumaDonacion();
}

function DonacionesMayorCantidad() {
  //Muestra el o los mayores donadores.
  let aux = sistema.darDonacionesMayorCantidadVeces();
  let ul = document.getElementById("idListaDonantes");
  ul.innerHTML = "";
  for (let i = 0; i < aux.length; i++) {
    let li = document.createElement("li"); // create li element.
    li.innerHTML = aux[i]; // assigning text to li using array value.
    ul.appendChild(li); // append li to ul.
  }
}

function DonacionesReset() {
  // Borra los campos y el select.
  document.getElementById("IdNombreSelect").value = "null";
  document.getElementById("idMonto").value = "";
  document.getElementById("idComentario").value = "";
}

function ordenarporMonto() {
  // Función que ordena por monto decreciente.
  let aux = sistema.donaciones;
  aux.sort(function (a, b) {
    if (a.monto < b.monto) {
      return 1;
    }
    if (a.monto > b.monto) {
      return -1;
    }
    return 0;
  });
  let tablita = document.getElementById("cuerpoTabla");
  tablita.innerHTML = "";
  let datos = aux;
  if (datos.length == 0) {
    tablita.innerHTML = "SIN DATOS";
  } else {
    for (elemento of datos) {
      let fila = tablita.insertRow();
      let celda1 = fila.insertCell();
      celda1.innerHTML = elemento.donante;
      let celda2 = fila.insertCell();
      celda2.innerHTML = elemento.modo;
      let celda3 = fila.insertCell();
      celda3.innerHTML = elemento.monto;
      if (elemento.monto >= 1000) {
        //Si el valor supera 1000 el texto cambia a rojo, sinó es verde.
        celda3.style.color = "red";
      } else {
        celda3.style.color = "green";
      }
      let celda4 = fila.insertCell();
      celda4.innerHTML = elemento.comentarios;
    }
  }
}

function ordenarporNombre() {
  // Funcion que ordena por nombre creciente.
  let aux = sistema.donaciones;
  aux.sort(function (a, b) {
    if (a.donante > b.donante) {
      return 1;
    }
    if (a.donante < b.donante) {
      return -1;
    }
    return 0;
  });
  let tablita = document.getElementById("cuerpoTabla");
  tablita.innerHTML = "";
  let datos = aux;
  if (datos.length == 0) {
    tablita.innerHTML = "SIN DATOS";
  } else {
    for (elemento of datos) {
      let fila = tablita.insertRow();
      let celda1 = fila.insertCell();
      celda1.innerHTML = elemento.donante;
      let celda2 = fila.insertCell();
      celda2.innerHTML = elemento.modo;
      let celda3 = fila.insertCell();
      celda3.innerHTML = elemento.monto;
      if (elemento.monto >= 1000) {
        //Si el valor supera 1000 el texto cambia a rojo, sinó es verde.
        celda3.style.color = "red";
      } else {
        celda3.style.color = "green";
      }
      let celda4 = fila.insertCell();
      celda4.innerHTML = elemento.comentarios;
    }
  }
}

function totalDonaciones() {
  // Suma la cantidad total de donaciones ingresadas.
  let total = sistema.cantidadDonaciones();
  document.getElementById("idTotalDonaciones").innerHTML =
    "Cantidad total de donaciones: " + total;
}

function promedioDonaciones() {
  // Calcula el promedio de donaciones.
  let donaciones = sistema.cantidadDonaciones();
  let sumaMonto = 0;
  let aux = 0;
  let promedio = 0;
  for (let i = 0; i < sistema.donaciones.length; i++) {
    let unMonto = sistema.donaciones[i].monto;
    sumaMonto = unMonto + sumaMonto;
  }
  promedio = parseInt(sumaMonto / donaciones);
  document.getElementById("idPromedioDonaciones").innerHTML =
    "Promedio total de donaciones: " + promedio;
}

function checkedBox() {
  //Funcion en que pinta de color las fillas de amarillo
  let checked = document.getElementById("CheckBoxFilas").checked;

  let monto = document.getElementById("filasMonto").value;
  let cuerpo = document.getElementById("cuerpoTabla");
  let filas = cuerpo.getElementsByTagName("tr");
  for (let fila = 0; fila < filas.length; fila++) {
    if (monto == filas[fila].children[2].innerText)
      filas[fila].style.background = "yellow";
  }
  if (checked != true) {
    for (let fila = 0; fila < filas.length; fila++) {
      filas[fila].style.background = "rgb(186, 186, 186)";
    }
  }
}

function mostrarTotalGeneral() {
  let totalG = sistema.totalMonto();
  let aux = document.getElementById("MontoTotal");
  let donante = sistema.donanteAString();
  if (donante !== null) {
    aux.innerHTML = "$ " + totalG;
  }
}

function mostrarMayorDonacion() {
  let mayor = sistema.mayorDonacion();
  let aux = document.getElementById("TotalResultado");
  aux.innerHTML = "$ " + mayor;
}

//Google charts

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  let efectivo = 0;
  let transferencia = 0;
  let canje = 0;
  let mercaderia = 0;
  let cheques = 0;
  let otros = 0;

  let cuerpo = document.getElementById("cuerpoTabla");
  let filas = cuerpo.getElementsByTagName("tr");

  for (let fila = 0; fila < filas.length; fila++) {
    if (filas[fila].children[1].innerText == "efectivo") {
      efectivo++;
    } else if (filas[fila].children[1].innerText == "transferencia") {
      transferencia++;
    } else if (filas[fila].children[1].innerText == "canje") {
      canje++;
    } else if (filas[fila].children[1].innerText == "mercaderia") {
      mercaderia++;
    } else if (filas[fila].children[1].innerText == "cheque") {
      cheques++;
    } else if (filas[fila].children[1].innerText == "otros") {
      otros++;
    }
  }

  var data = google.visualization.arrayToDataTable([
    ["Task", "Modo"],
    ["Efectivo", efectivo],
    ["Transferencia", transferencia],
    ["Canje", canje],
    ["Mercaderia", mercaderia],
    ["Cheques", cheques],
    ["Otros", otros],
  ]);

  var options = {
    title: "Donaciones por modo",
    backgroundColor: "rgb(186, 186, 186)",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
