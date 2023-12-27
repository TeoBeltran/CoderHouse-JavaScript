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

registrarUsuario();
