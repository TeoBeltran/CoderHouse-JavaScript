function registrarUsuario() {
    alert("Bienvenido al formulario de registro.");

    let nombre = prompt("Ingrese su nombre:");
    let apellido = prompt("Ingrese su apellido:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    while (contador < 2) {
        alert("¡Hola " + nombre + "!");
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

let productos;

if (localStorage.getItem('productos')) {
    productos = JSON.parse(localStorage.getItem('productos'));
} else {
    productos = [
        { nombre: "Producto1", desc: "Descripción del Producto 1", precio: 29.99 },
        { nombre: "Producto2", desc: "Descripción del Producto 2", precio: 39.99 },
        { nombre: "Producto3", desc: "Descripción del Producto 3", precio: 49.99 },
        { nombre: "Producto4", desc: "Descripción del Producto 4", precio: 75.00 },
        { nombre: "Producto5", desc: "Descripción del Producto 5", precio: 98.00 }
    ];

    localStorage.setItem('productos', JSON.stringify(productos));
}

productos.forEach(function(producto, index) {
    let Producto1 = new Producto(producto.nombre, producto.desc, producto.precio);

    let productoCard1 = document.getElementById("productoCard");

    let card = document.createElement("div");
    card.className = "card";

    let titulo = document.createElement("h2");
    titulo.textContent = Producto1.nombre;

    let blackBox = document.createElement("div");
    blackBox.className = "black-box";

    let desc = document.createElement("p");
    desc.textContent = Producto1.desc;

    let precio = document.createElement("p");
    precio.textContent = Producto1.precio;

    let button = document.createElement("button");
    button.textContent = "Agregar al carrito";

    button.addEventListener("click", function() {
        cantidadProductos = document.querySelector('.cantidadProductos')
        let valor = parseInt(cantidadProductos.textContent)
        let newValor = valor + 1
        cantidadProductos.textContent = newValor

        precioProductos = document.querySelector('.precioProductos')
        let valor2 = parseFloat(precioProductos.textContent)
        let newValor2 = valor2 + Producto1.precio
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
/*
let borrarCarrito = document.querySelector('.borrarCarrito')
borrarCarrito.addEventListener("click", function() {
    cantidadProductos = document.querySelector('.cantidadProductos')
    cantidadProductos.textContent = 0

    precioProductos = document.querySelector('.precioProductos')
    precioProductos.textContent = 0

    alert("Productos eliminados del carrito");
});

document.addEventListener("keyup", function(event) {
    if (event.key === "Delete") {
        borrarCarrito.click();
    }
});
*/
document.querySelector('.borrarCarrito').onclick = function() {
    document.querySelector('.cantidadProductos').textContent = 0;
    document.querySelector('.precioProductos').textContent = 0;
    alert("Productos eliminados del carrito");
};
document.addEventListener('keyup', function(event) {
    if (event.key === 'Delete') {
        document.querySelector('.cantidadProductos').textContent = 0;
        document.querySelector('.precioProductos').textContent = 0;
        alert("Productos eliminados del carrito");
    }
});


let comprarCarrito = document.querySelector('.comprarCarrito')
comprarCarrito.addEventListener("click", function() {
    alert("Función no implementada");
});

