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
    // Verificar si la función actualizarListaCarrito está definida antes de llamarla
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

// Borrar todo el carrito
document.querySelector('.borrarCarrito').onclick = function() {
    carrito = [];
    localStorage.removeItem('carrito');

    mostrarCantidadProductosCarrito();
    mostrarPrecioTotalCarrito();
    
    alert("Productos eliminados del carrito");

    location.reload();
};

// Comprar, no implementado
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
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Comprar",
            text: "Función no implementada",
            icon: "question"
          });
        }
      });
});

// Volver a la pagina principal
let verCarritoButton = document.querySelector('.verCarrito');
verCarritoButton.addEventListener("click", function() {
    window.location.href = 'index.html';
});


// Llamado a las funciones otra vez
mostrarCantidadProductosCarrito();
mostrarPrecioTotalCarrito();
