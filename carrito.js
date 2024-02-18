let carrito = JSON.parse(localStorage.getItem('carrito'));
console.log(carrito);

if (carrito !== null) {
    let productosCarrito = document.getElementById('productosCarrito');

    // Limpiar cosas viejas si hay
    productosCarrito.innerHTML = '';

    // Crear un elemento <div> para cada producto
    carrito.forEach(function(producto, index) {
        let productoElement = document.createElement('div');
        productoElement.className = 'producto';

        let textoProducto = document.createElement('p');
        textoProducto.textContent = producto.nombre + ' - $' + producto.precio;

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'eliminarProducto';
        botonEliminar.addEventListener('click', function() {
            eliminarProducto(index);
        });

        productoElement.appendChild(textoProducto);
        productoElement.appendChild(botonEliminar);

        productosCarrito.appendChild(productoElement);
    });

    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
}

// Mostrar la cantidad de productos en el carrito
function mostrarCantidadProductosCarrito() {
    let cantidadProductosElement = document.querySelector('.cantidadProductos');
    if (carrito !== null) {
        cantidadProductosElement.textContent = carrito.length;
    } else {
        cantidadProductosElement.textContent = 0;
    }
}

// Mostrar el precio total de los productos en el carrito
function mostrarPrecioTotalCarrito() {
    let precioProductosElement = document.querySelector('.precioProductos');
    if (carrito !== null) {
        let precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        precioProductosElement.textContent = precioTotal.toFixed(2);
    } else {
        precioProductosElement.textContent = '0.00';
    }
}

// Eliminar un producto individual del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarLocalStorageCarrito();
    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
    if (typeof actualizarListaCarrito === 'function') {
        actualizarListaCarrito();
    }
    
    Swal.fire("Producto eliminado del carrito").then(() => {
        setTimeout(function() {
            location.reload();
        }, 1); //El 1 es en milisegundos
    });
}

// Actualizar el carrito
function actualizarLocalStorageCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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

            setTimeout(() => {
                Swal.close();
                location.reload(); 
            }, 2500);
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

let recargarButton = document.querySelector('.volverCargar');
recargarButton.addEventListener("click", function() {
    localStorage.removeItem('usuario');
    location.reload();
});

//--------------------------------------------------------------------------------------------------------------------------------

// Volver a la pagina principal
let verCarritoButton = document.querySelector('.verCarrito');
verCarritoButton.addEventListener("click", function() {
    window.location.href = 'index.html';
});


// Llamado a las funciones otra vez
mostrarCantidadProductosCarrito();
mostrarPrecioTotalCarrito();
