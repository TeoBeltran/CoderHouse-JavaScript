function registrarUsuario() {
    alert("Bienvenido al formulario de registro.");

    let nombre = prompt("Ingrese su nombre:");
    let apellido = prompt("Ingrese su apellido:");
    let genero = prompt("Ingrese su género:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    if (nombre && apellido && genero && !isNaN(edad) && edad > 0) {
        console.log("Registro exitoso:");
        console.log("Nombre:", nombre);
        console.log("Apellido:", apellido);
        console.log("Género:", genero);
        console.log("Edad:", edad);

        let contador = 0;
        while (contador < 3) {
            console.log("¡Hola", nombre, "!");
            contador++;
        }

        alert("¡Registro exitoso!");
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

registrarUsuario();
