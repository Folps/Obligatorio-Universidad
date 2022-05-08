// Autores  - Felipe Iraola - 196542 - Juan Cabrera - 169448

class Sistema {
  constructor() {
    this.donantes = [];
    this.donaciones = [];
  }
  agregarDonante(unaPersona) {
    this.donantes.push(unaPersona);
  }
  mostrarDonantes() {
    return this.donantes;
  }
  totalDonantes() {
    return this.donantes.length;
  }
  donanteRepetido(nombre) {
    let aux = true;
    for (let i = 0; i < this.donantes.length; i++) {
      if (nombre.toLowerCase() === sistema.donantes[i].nombre.toLowerCase()) {
        alert("Nombre repetido");
        aux = false;
      }
    }
    return aux;
  }
  agregarDonacion(unaDonacion) {
    this.donaciones.push(unaDonacion);
  }

  mostrarDonaciones() {
    return this.donaciones;
  }
  cantidadDonaciones() {
    return this.donaciones.length;
  }
  hayMontos() {
    return this.donaciones.length > 0;
  }
  totalMonto() {
    if (this.hayMontos()) {
      let suma = 0;
      for (let i = 0; i < this.mostrarDonaciones().length; i++) {
        let montos = this.mostrarDonaciones()[i];
        suma += montos.monto;
      }
      return suma;
    }
  }
  mayorDonacion() {
    let retorno = 0;
    if (this.hayMontos()) {
      let max = 0;
      for (let i = 0; i < this.mostrarDonaciones().length; i++) {
        let misMontos = this.mostrarDonaciones()[i];
        if (misMontos.monto > max) {
          max = misMontos.monto;
        }
      }
      retorno = max;
    }
    return retorno;
  }
  donanteAString() {
    let aux = document.getElementById("IdNombreSelect").value;
    for (let i = 0; i < sistema.donantes.length; i++) {
      if (aux === sistema.donantes[i].nombre) {
        let aux2 = sistema.donantes[i].toString();
        return aux2;
      }
    }
  }
  sumaDonacion() {
    let aux = document.getElementById("IdNombreSelect").value;
    for (let i = 0; i < sistema.donantes.length; i++) {
      if (aux === sistema.donantes[i].nombre) {
        let aux2 = sistema.donantes[i].cantdons++;
        return aux2;
      }
    }
  }
  darDonacionesMayorCantidadVeces() {
    let max = 0;
    let auxArray = [];
    for (let i = 0; i < sistema.donantes.length; i++) {
      let donacionAux = sistema.donantes[i];
      if (donacionAux.cantdons > max) {
        max = donacionAux.cantdons;
        auxArray = [];
        auxArray.push(donacionAux);
      } else {
        if (donacionAux.cantdons == max) {
          auxArray.push(donacionAux);
        }
      }
    }
    return auxArray;
  }
}

class Donante {
  constructor(nombre, direcciones, telefonos, cantdons) {
    this.nombre = nombre;
    this.direccion = direcciones;
    this.telefono = telefonos;
    this.cantdons = cantdons;
  }
  toString() {
    return this.nombre + " (" + this.direccion + ", " + this.telefono + ")";
  }
}

class Donacion {
  constructor(donante, modo, monto, comentarios) {
    this.donante = donante;
    this.modo = modo;
    this.monto = monto;
    this.comentarios = comentarios;
  }
  toString() {
    return this.donante + this.modo + this.monto + this.comentarios;
  }
}
