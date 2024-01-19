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

var productos = [
    { nombre: "Producto1", desc: "Descripción del Producto 1", precio: 29.99 },
    { nombre: "Producto2", desc: "Descripción del Producto 2", precio: 39.99 },
    { nombre: "Producto3", desc: "Descripción del Producto 3", precio: 49.99 }
];

productos.forEach(function(producto, index) {
    var Producto1 = new Producto(producto.nombre, producto.desc, producto.precio);

    var productoCard1 = document.getElementById("productoCard1");

    var card = document.createElement("div");
    card.className = "card";

    var titulo = document.createElement("h2");
    titulo.textContent = Producto1.nombre;

    var blackBox = document.createElement("div");
    blackBox.className = "black-box";

    var desc = document.createElement("p");
    desc.textContent = Producto1.desc;

    var precio = document.createElement("p");
    precio.textContent = Producto1.precio;

    var button = document.createElement("button");
    button.textContent = "Comprar";

    button.addEventListener("click", function() {
        cantidadProductos = document.querySelector('.cantidadProductos')
        var valor = parseInt(cantidadProductos.textContent)
        var newValor = valor + 1
        cantidadProductos.textContent = newValor

        precioProductos = document.querySelector('.precioProductos')
        var valor2 = parseFloat(precioProductos.textContent)
        var newValor2 = valor2 + Producto1.precio
        precioProductos.textContent = newValor2

        alert("Producto agregado al carrito");
    });

    card.appendChild(titulo);
    card.appendChild(blackBox);
    card.appendChild(desc);
    card.appendChild(precio);
    card.appendChild(button);

    productoCard1.appendChild(card);
});

var borrarCarrito = document.querySelector('.borrarCarrito')
borrarCarrito.addEventListener("click", function() {
    cantidadProductos = document.querySelector('.cantidadProductos')
    cantidadProductos.textContent = 0

    precioProductos = document.querySelector('.precioProductos')
    precioProductos.textContent = 0

    alert("Productos eliminados del carrito");
});
