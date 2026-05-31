let registros = [];

function registrar() {

    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let sexo = document.getElementById("sexo").value;
    let lugar = document.getElementById("lugar").value;

    if (nombre === "") {
        alert("Ingrese el nombre");
        return;
    }

    let persona = {
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        lugar: lugar
    };

    registros.push(persona);

    mostrarRegistros();

    limpiar();

    alert("Persona registrada correctamente");
}

function mostrarRegistros() {

    let contenedor = document.getElementById("registros");

    contenedor.innerHTML = "";

    for (let persona of registros) {

        contenedor.innerHTML += `
            <p>
                ${persona.nombre} |
                ${persona.edad} años |
                ${persona.lugar}
            </p>
        `;
    }
}

function limpiar() {

    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("lugar").value = "";
}