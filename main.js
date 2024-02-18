//Registrar un usuario
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
                if (nombre && apellido && !isNaN(edad) && edad >= 18 && edad < 110) {
                    resolve({ nombre, apellido, edad });
                    Swal.fire(`¡Registro exitoso!`);
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
}

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
function Producto(id, nombre, desc, precio) {
    this.id = id;
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
    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
}

//--------------------------------------------------------------------------------------------------------------------------------

async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        const data = await response.json();

        data.forEach(function(producto, index) {
            let Producto1 = new Producto(producto.id, producto.nombre, producto.desc, producto.precio);

            let productoCard1 = document.getElementById("productoCard");

            let card = document.createElement("div");
            card.className = "card";

            let titulo = document.createElement("h2");
            titulo.textContent = Producto1.nombre;

            let imagen = document.createElement("img");
            imagen.src = `img/${producto.id}.jpg`;
            imagen.alt = Producto1.nombre; 
            imagen.className = "producto-imagen"; 
            imagen.width = 200;
            imagen.height = 200;


            let desc = document.createElement("p");
            desc.textContent = Producto1.desc;
            let precio = document.createElement("p");
            precio.textContent = Producto1.precio;
            let button = document.createElement("button");
            button.textContent = "Agregar al carrito";
            button.className = "btnAgregarC";

            button.addEventListener("click", function() {                    
                let nuevoProducto = new Producto(producto.id, producto.nombre, producto.desc, producto.precio);
                agregarAlCarrito(Producto1);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto agregado al carrito",
                    showConfirmButton: false,
                    timer: 1000
                });
            });

            card.appendChild(titulo);
            card.appendChild(imagen);
            card.appendChild(desc);
            card.appendChild(precio);
            card.appendChild(button);

            productoCard1.appendChild(card);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

//--------------------------------------------------------------------------------------------------------------------------------

// Borrar el localStorage del carrito
function verificarUsuarioAntesDeLimpiarCarrito() {
    let usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
        registrarUsuario()
            .then(({ nombre, apellido, edad }) => {
                let usuario = { nombre, apellido, edad };
                localStorage.setItem('usuario', JSON.stringify(usuario));
                Swal.fire(`¡Registro exitoso!`);
                limpiarCarrito();
            });
    } else {
        limpiarCarrito();
    }
}

function limpiarCarrito() {
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
            carrito = [];
            localStorage.removeItem('carrito');
            mostrarCantidadProductosCarrito();
            mostrarPrecioTotalCarrito();

            Swal.fire({
                title: "Borrar carrito",
                text: "Se eliminaron los productos del carrito",
                icon: "success"
            });
        }
    });
}

let limpiarCarritoButton = document.querySelector('.borrarCarrito');
limpiarCarritoButton.onclick = function() {
    verificarUsuarioAntesDeLimpiarCarrito();
};

// Comprar
function verificarUsuarioAntesDeComprar() {
    let usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
        registrarUsuario()
            .then(({ nombre, apellido, edad }) => {
                let usuario = { nombre, apellido, edad };
                localStorage.setItem('usuario', JSON.stringify(usuario));
                Swal.fire(`¡Registro exitoso!`);
                realizarCompra();
            });
    } else {
        realizarCompra();
    }
}

function realizarCompra() {
    Swal.fire({
        title: "Confirmar compra",
        text: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem('carrito');
            mostrarCantidadProductosCarrito();
            mostrarPrecioTotalCarrito();

            Swal.fire({
                title: "Comprar productos",
                text: "Compra confirmada",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Acción cancelada",
                text: "No se compraron los productos",
                icon: "error"
            });
        }
    });
}

let comprarCarritoButton = document.querySelector('.comprarCarrito');
comprarCarritoButton.addEventListener("click", function() {
    verificarUsuarioAntesDeComprar();
});

// Ir al carrito
function verificarUsuarioAntesDeVerCarrito() {
    let usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
        registrarUsuario()
            .then(({ nombre, apellido, edad }) => {
                let usuario = { nombre, apellido, edad };
                localStorage.setItem('usuario', JSON.stringify(usuario));
                Swal.fire(`¡Registro exitoso!`);
                window.location.href = 'carrito.html';
            });
    } else {
        window.location.href = 'carrito.html';
    }
}

let verCarritoButton = document.querySelector('.verCarrito');
verCarritoButton.addEventListener("click", function() {
    verificarUsuarioAntesDeVerCarrito();
});

let recargarButton = document.querySelector('.volverCargar');
recargarButton.addEventListener("click", function() {
    localStorage.removeItem('usuario');
    location.reload();
});

// Carga de productos y muestra de cantidad y precio
cargarProductos();

mostrarCantidadProductosCarrito();
mostrarPrecioTotalCarrito();

