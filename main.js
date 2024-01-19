function registrarUsuario() {
    alert("Bienvenido al formulario de registro.");

    let nombre = prompt("Ingrese su nombre:");
    let apellido = prompt("Ingrese su apellido:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    let contador = 0;
    while (contador < 2) {
        if(contador == 1) {
            alert("¡Hola otra vez, " + nombre + "!");
        }
        else{
            alert("¡Hola " + nombre + "!");
        }
        contador++;
    }

    if (edad > 0) {
        console.log("Prueba de consol.log correcta!");

        alert("¡Registro exitoso!");
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

//registrarUsuario();


function Producto(nombre, desc, precio) {
    this.nombre = nombre;
    this.desc = desc;
    this.precio = precio;
}

var Producto1 = new Producto("Producto1", "Descripción del Producto1", 49.99);

// Actualizar la card del Producto1 en el HTML
var productoCard1 = document.getElementById("productoCard1");

// Crear elementos HTML con los datos del Producto1
var card = document.createElement("div");
card.className = "card";

var titulo = document.createElement("h2");
titulo.textContent = Producto1.nombre;

var blackBox = document.createElement("div");
blackBox.className = "black-box";

var desc = document.createElement("p");
desc.textContent = Producto1.desc;

var button = document.createElement("button");
button.textContent = "Comprar";

// Agregar elementos al contenedor de la card
card.appendChild(titulo);
card.appendChild(blackBox);
card.appendChild(desc);
card.appendChild(button);

// Agregar la card al contenedor en el HTML
productoCard1.appendChild(card);


console.log("Nombre del producto: " + Producto1.nombre);
console.log("Descripción del producto: " + Producto1.desc);
console.log("Precio del producto: $" + Producto1.precio);