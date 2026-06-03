let registros =
JSON.parse(localStorage.getItem("registros")) || [];

let mapa = L.map("map").setView([19.4326, -99.1332], 5);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap"
    }
).addTo(mapa);

let latSeleccionada = null;
let lngSeleccionada = null;
let marcadorTemporal = null;

mapa.on("click", function(e){

    latSeleccionada = e.latlng.lat;
    lngSeleccionada = e.latlng.lng;

    if(marcadorTemporal){
        mapa.removeLayer(marcadorTemporal);
    }

    marcadorTemporal = L.marker([
        latSeleccionada,
        lngSeleccionada
    ]).addTo(mapa);

});

function registrar(){

    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let sexo = document.getElementById("sexo").value;
    let estatura = document.getElementById("estatura").value;
    let peso = document.getElementById("peso").value;
    let ojos = document.getElementById("ojos").value;
    let cabello = document.getElementById("cabello").value;
    let senas = document.getElementById("senas").value;
    let vestimenta = document.getElementById("vestimenta").value;
    let fecha = document.getElementById("fecha").value;
    let lugar = document.getElementById("lugar").value;
    let telefono = document.getElementById("telefono").value;

    let archivoFoto =
    document.getElementById("foto").files[0];

    if(nombre === ""){
        alert("Ingrese el nombre");
        return;
    }

    function guardarPersona(fotoBase64){

        let persona = {

            nombre,
            edad,
            sexo,
            estatura,
            peso,
            ojos,
            cabello,
            senas,
            vestimenta,
            fecha,
            lugar,
            telefono,

            foto: fotoBase64,

            lat: latSeleccionada,
            lng: lngSeleccionada
        };

        registros.push(persona);

        localStorage.setItem(
            "registros",
            JSON.stringify(registros)
        );

        mostrarRegistros();
        actualizarEstadisticas();
        limpiar();

        alert("Persona registrada correctamente");

    }

    if(archivoFoto){

        let lector = new FileReader();

        lector.onload = function(){

            guardarPersona(
                lector.result
            );

        };

        lector.readAsDataURL(
            archivoFoto
        );

    }else{

        guardarPersona("");

    }

}

function mostrarRegistros(){

    let contenedor =
    document.getElementById("registros");

    contenedor.innerHTML = "";

    registros.forEach((persona, indice)=>{

        let tarjeta =
        document.createElement("div");

        tarjeta.className = "tarjeta";

        tarjeta.innerHTML = `

        <div class="foto">

        ${
        persona.foto
        ?
        `<img src="${persona.foto}" alt="Foto">`
        :
        `<img src="https://via.placeholder.com/220x220?text=Sin+Foto" alt="Sin Foto">`
        }

        </div>

        <div class="info">

        <h3>${persona.nombre}</h3>

        <p><b>Edad:</b> ${persona.edad}</p>

        <p><b>Sexo:</b> ${persona.sexo}</p>

        <p><b>Estatura:</b> ${persona.estatura}</p>

        <p><b>Peso:</b> ${persona.peso}</p>

        <p><b>Ojos:</b> ${persona.ojos}</p>

        <p><b>Cabello:</b> ${persona.cabello}</p>

        <p><b>Señas:</b> ${persona.senas}</p>

        <p><b>Vestimenta:</b> ${persona.vestimenta}</p>

        <p><b>Fecha:</b> ${persona.fecha}</p>

        <p><b>Lugar:</b> ${persona.lugar}</p>

        <p><b>Teléfono:</b> ${persona.telefono}</p>

        <div class="botones">

        <button
        class="verMapa"
        onclick="verMapa(${persona.lat}, ${persona.lng})">
        Ver en mapa
        </button>

        <button
        class="eliminar"
        onclick="eliminarRegistro(${indice})">
        Eliminar
        </button>

        </div>

        </div>
        `;

        contenedor.appendChild(
            tarjeta
        );

    });

    actualizarMapa();

}

function eliminarRegistro(indice){

    registros.splice(indice,1);

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );

    mostrarRegistros();
    actualizarEstadisticas();

}

function actualizarEstadisticas(){

    document.getElementById(
        "totalPersonas"
    ).textContent = registros.length;

    let hombres =
    registros.filter(
        p => p.sexo === "Masculino"
    ).length;

    let mujeres =
    registros.filter(
        p => p.sexo === "Femenino"
    ).length;

    document.getElementById(
        "totalHombres"
    ).textContent = hombres;

    document.getElementById(
        "totalMujeres"
    ).textContent = mujeres;

}

function actualizarMapa(){

    mapa.eachLayer(function(layer){

        if(layer instanceof L.Marker){

            mapa.removeLayer(layer);

        }

    });

    registros.forEach(persona=>{

        if(
            persona.lat !== null &&
            persona.lng !== null
        ){

            L.marker([
                persona.lat,
                persona.lng
            ])
            .addTo(mapa)
            .bindPopup(
                `<b>${persona.nombre}</b><br>${persona.lugar}`
            );

        }

    });

}

function verMapa(lat,lng){

    if(lat === null || lng === null){

        alert(
            "Esta persona no tiene ubicación registrada"
        );

        return;
    }

    mapa.setView([lat,lng],13);

}

function limpiar(){

    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("estatura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("ojos").value = "";
    document.getElementById("cabello").value = "";
    document.getElementById("senas").value = "";
    document.getElementById("vestimenta").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("lugar").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("foto").value = "";

}

document
.getElementById("buscarNombre")
.addEventListener("input", function(){

    let texto =
    this.value.toLowerCase();

    document
    .querySelectorAll(".tarjeta")
    .forEach(tarjeta=>{

        if(
            tarjeta.innerText
            .toLowerCase()
            .includes(texto)
        ){

            tarjeta.style.display =
            "flex";

        }else{

            tarjeta.style.display =
            "none";

        }

    });

});

function generarPDF(){

    const { jsPDF } = window.jspdf;

    let pdf = new jsPDF();

    pdf.setFontSize(16);

    pdf.text(
        "Reporte de Personas Registradas",
        10,
        15
    );

    let y = 30;

    registros.forEach((persona)=>{

        pdf.setFontSize(11);

        pdf.text(
            `Nombre: ${persona.nombre}`,
            10,
            y
        );

        y += 7;

        pdf.text(
            `Edad: ${persona.edad} | Sexo: ${persona.sexo}`,
            10,
            y
        );

        y += 7;

        pdf.text(
            `Lugar: ${persona.lugar}`,
            10,
            y
        );

        y += 10;

        if(y > 270){

            pdf.addPage();
            y = 20;

        }

    });

    pdf.save(
        "personas_desaparecidas.pdf"
    );

}

mostrarRegistros();
actualizarEstadisticas();