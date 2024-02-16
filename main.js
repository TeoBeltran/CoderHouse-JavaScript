// Función para registrar un usuario
function registrarUsuario() {
    alert("Bienvenido al formulario de registro.");

    let nombre = prompt("Ingrese su nombre:");
    let apellido = prompt("Ingrese su apellido:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    edad > 0 ? alert("¡Registro exitoso!") : alert("Por favor, complete todos los campos correctamente.");
}

// Definición del constructor Producto
function Producto(nombre, desc, precio) {
    this.nombre = nombre;
    this.desc = desc;
    this.precio = precio;
}

// Se obtiene el carrito almacenado en localStorage al cargar la página
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

// Función para actualizar el carrito en el localStorage
function actualizarLocalStorageCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Se obtiene el contenedor de la lista del carrito
let listaCarrito = document.querySelector('.listaCarrito');

// Función para actualizar la lista del carrito en la página
function actualizarListaCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach(function(producto) {
        let productoItem = document.createElement('p');
        productoItem.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(productoItem);
    });
}

// Función para mostrar la cantidad de productos en el carrito
function mostrarCantidadProductosCarrito() {
    let cantidadProductos = document.querySelector('.cantidadProductos');
    cantidadProductos.textContent = carrito.length;
}

// Función para mostrar el precio total de los productos en el carrito
function mostrarPrecioTotalCarrito() {
    let precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    let precioProductos = document.querySelector('.precioProductos');
    precioProductos.textContent = precioTotal.toFixed(2);
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarLocalStorageCarrito();
    actualizarListaCarrito();
    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
}

// Definición de los productos
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

// Función para cargar los productos en la página
function cargarProductos() {
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
            agregarAlCarrito(Producto1);
            alert("Producto agregado al carrito");
        });

        card.appendChild(titulo);
        card.appendChild(blackBox);
        card.appendChild(desc);
        card.appendChild(precio);
        card.appendChild(button);

        productoCard1.appendChild(card);
    });

    // Al cargar la página, se actualiza la lista del carrito
    actualizarListaCarrito();
}

// Para modificar un producto ya guardado en localStorage
document.addEventListener('DOMContentLoaded', function() {
    let volverCargarButton = document.querySelector('.volverCargar');

    volverCargarButton.addEventListener('click', function() {
        localStorage.removeItem('productos');

        location.reload();
    });
});

// Borrar el localStorage del carrito
document.querySelector('.borrarCarrito').onclick = function() {
    carrito = [];
    localStorage.removeItem('carrito');

    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
    
    alert("Productos eliminados del carrito");

    location.reload();
};
document.addEventListener('keyup', function(event) {
    if (event.key === 'Delete') {
        carrito = [];
        localStorage.removeItem('carrito');

        mostrarCantidadProductosCarrito();
        mostrarPrecioTotalCarrito();
        
        alert("Productos eliminados del carrito");
    }
});

let comprarCarrito = document.querySelector('.comprarCarrito')
comprarCarrito.addEventListener("click", function() {
    alert("Función no implementada");
});

let verCarritoButton = document.querySelector('.verCarrito');
verCarritoButton.addEventListener("click", function() {
    window.location.href = 'carrito.html';
});

// Llamada para cargar los productos en la página
cargarProductos();

// Llamadas iniciales para mostrar la cantidad de productos y el precio total del carrito
mostrarCantidadProductosCarrito();
mostrarPrecioTotalCarrito();

