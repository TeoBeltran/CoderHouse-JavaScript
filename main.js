//Registrar un usuario

function registrarUsuario() {
    return new Promise((resolve, reject) => {
        alert("Bienvenido al formulario de registro.");

        let nombre = prompt("Ingrese su nombre:");
        let apellido = prompt("Ingrese su apellido:");
        let edad = parseInt(prompt("Ingrese su edad:"));

        if (nombre && apellido && !isNaN(edad) && edad >= 18) {
            resolve("¡Registro exitoso!");
        } else {
            reject("Error: Por favor, complete todos los campos correctamente.");
        }
    });
}

function manejarRegistro() {
    registrarUsuario()
        .then((mensaje) => {
            alert(mensaje);
        })
        .catch((error) => {
            alert(error);

            manejarRegistro();
        });
}

manejarRegistro();

//SE ESTÁ TRABAJANDO CON ESTO COMENTADO PARA BUSCAR LA SOLUCION A UN PROBLEMA QUE PASA
//SI CUANDO SALE EL CUADRO DE DIALOGO EL USUARIO HACES CLICK FUERA DE ESTE,
//EL CUADRO SE SALE, Y SE PUEDE NAVEGAR LIBREMENTE SIN TENER QUE REGISTRARSE

// Registrar Usuario
/*
function registrarUsuario() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Registro de Usuario',
            html:
                '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
                '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
                '<input id="edad" type="number" class="swal2-input" placeholder="Edad">',
            focusConfirm: false,
            preConfirm: () => {
                const nombre = Swal.getPopup().querySelector('#nombre').value;
                const apellido = Swal.getPopup().querySelector('#apellido').value;
                const edad = Swal.getPopup().querySelector('#edad').value;
                if (nombre && apellido && !isNaN(edad) && edad >= 18) {
                    resolve({ nombre, apellido, edad });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor complete todos los campos correctamente.',
                        icon: 'error'
                    }).then(() => {
                        registrarUsuario();
                    });
                }
            }
        });
    });
}

let usuarioStorage = localStorage.getItem('usuario');
if (!usuarioStorage) {
    // Pedir registro si no existe en el storage
    registrarUsuario()
        .then(({ nombre, apellido, edad }) => {
            let usuario = { nombre, apellido, edad };
            // Guardar los datos en localStorage
            localStorage.setItem('usuario', JSON.stringify(usuario));
            Swal.fire(`¡Registro exitoso!`);
        });
}*/

// Este remove esta para probar de borrarlo y crear otro
//localStorage.removeItem('usuario');


//--------------------------------------------------------------------------------------------------------------------------------

// Variable para el contador de compras
let cantCompras;

// Obtener el valor actual de 'cantCompras' del localStorage
cantCompras = parseInt(localStorage.getItem('cantCompras'));

// Verificar si 'cantCompras' es NaN o no está definida
if (isNaN(cantCompras)) {
    // Si es NaN o no está definida, establecerla en 0
    cantCompras = 0;
    localStorage.setItem('cantCompras', cantCompras.toString());
    console.log("Cantidad de compras inicializada en 0");
} else {
    console.log("Cantidad de compras actual:", cantCompras);
}

//--------------------------------------------------------------------------------------------------------------------------------


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
            //alert("Producto agregado al carrito");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1000
            });
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
    
    Swal.fire({
        title: "Borrar carrito",
        text: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Borrar carrito",
            text: "Se eliminaron los productos del carrito",
            icon: "success"
            });
        }
    });

    setTimeout(function() {
        location.reload();
    }, 2500);
};
document.addEventListener('keyup', function(event) {
    if (event.key === 'Delete') {
        carrito = [];
        localStorage.removeItem('carrito');

        mostrarCantidadProductosCarrito();
        mostrarPrecioTotalCarrito();
        
        alert("Productos eliminados del carrito");
        location.reload();
    }
});

let comprarCarrito = document.querySelector('.comprarCarrito')
comprarCarrito.addEventListener("click", function() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Estas seguro?",
        text: "No se podrá volver atrás",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "No, cancelar!",
        cancelButtonText: "Si, estoy seguro",
        reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
            title: "Acción cancelada",
            text: "No se compraron los productos",
            icon: "error"
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        cantCompras++;
        localStorage.setItem('cantCompras', cantCompras.toString());
        console.log("Cantidad de compras actual:", cantCompras);

        swalWithBootstrapButtons.fire({
        title: "Comprar",
        text: "Función no implementada",
        icon: "question"
        });
    }
    });
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

/*
const eventoFuturo = () => {
    return new Promise((resolve, reject) => {
        if (cantCompras > 0) {
            resolve('Promesa resuelta');
        } else {
            reject('Promesa rechazada');
        }
    });
};

console.log(eventoFuturo(true)) // Promise { 'Promesa resuelta' }
console.log(eventoFuturo(false)) // Promise { <rejected> 'Promesa rechazada' }
*/
