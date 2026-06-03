let registros =
JSON.parse(localStorage.getItem("registros")) || [];

let mapa = L.map('map').setView([19.4326, -99.1332], 5);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution:'© OpenStreetMap'
    }
).addTo(mapa);

let marcadorTemporal = null;
let latSeleccionada = null;
let lngSeleccionada = null;

mapa.on("click", function(e){

    latSeleccionada = e.latlng.lat;
    lngSeleccionada = e.latlng.lng;

    if(marcadorTemporal){
        mapa.removeLayer(marcadorTemporal);
    }

    marcadorTemporal =
    L.marker([latSeleccionada,lngSeleccionada])
    .addTo(mapa);

});

function registrar(){

    let nombre =
    document.getElementById("nombre").value;

    let edad =
    document.getElementById("edad").value;

    let sexo =
    document.getElementById("sexo").value;

    let estatura =
    document.getElementById("estatura").value;

    let peso =
    document.getElementById("peso").value;

    let ojos =
    document.getElementById("ojos").value;

    let cabello =
    document.getElementById("cabello").value;

    let senas =
    document.getElementById("senas").value;

    let vestimenta =
    document.getElementById("vestimenta").value;

    let fecha =
    document.getElementById("fecha").value;

    let lugar =
    document.getElementById("lugar").value;

    let telefono =
    document.getElementById("telefono").value;

    let foto =
    document.getElementById("foto").files[0];

    if(nombre === ""){
        alert("Ingrese el nombre");
        return;
    }

    let lector = new FileReader();

    lector.onload = function(){

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

            foto: lector.result,

            lat: latSeleccionada,
            lng: lngSeleccionada
        };

        registros.push(persona);

        guardar();

        mostrarRegistros();

        actualizarEstadisticas();

        limpiar();
    };

    if(foto){
        lector.readAsDataURL(foto);
    }else{

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

            foto:"",

            lat: latSeleccionada,
            lng: lngSeleccionada
        };

        registros.push(persona);

        guardar();

        mostrarRegistros();

        actualizarEstadisticas();

        limpiar();
    }

}

function guardar(){

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );

}

function mostrarRegistros(){

    let contenedor =
    document.getElementById("registros");

    contenedor.innerHTML = "";

    registros.forEach((persona,indice)=>{

        let tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `

        ${
        persona.foto
        ?
        `img src="${persona.foto}"`
        :
        ""
        }

        <div class="info">

        <h3>${persona.nombre}</h3>

        <p><b>Edad:</b> ${persona.edad}</p>

        <p><b>Sexo:</b> ${persona.sexo}</p>

        <p><b>Lugar:</b> ${persona.lugar}</p>

        <p><b>Fecha:</b> ${persona.fecha}</p>

        <p><b>Teléfono:</b> ${persona.telefono}</p>

        <button
        class="eliminar"
        onclick="eliminarRegistro(${indice})">
        Eliminar
        </button>

        </div>
        `;

        contenedor.appendChild(tarjeta);

    });

    actualizarMapa();
}

function eliminarRegistro(indice){

    registros.splice(indice,1);

    guardar();

    mostrarRegistros();

    actualizarEstadisticas();

}

function actualizarEstadisticas(){

    document.getElementById(
    "totalPersonas"
    ).textContent = registros.length;

    let hombres =
    registros.filter(
    p=>p.sexo==="Masculino"
    ).length;

    let mujeres =
    registros.filter(
    p=>p.sexo==="Femenino"
    ).length;

    document.getElementById(
    "totalHombres"
    ).textContent = hombres;

    document.getElementById(
    "totalMujeres"
    ).textContent = mujeres;
}

document
.getElementById("buscarNombre")
.addEventListener("input",function(){

    let texto =
    this.value.toLowerCase();

    let tarjetas =
    document.querySelectorAll(".tarjeta");

    tarjetas.forEach(t=>{

        if(
        t.innerText.toLowerCase()
        .includes(texto)
        ){
            t.style.display="block";
        }else{
            t.style.display="none";
        }

    });

});

document
.getElementById("modoOscuroBtn")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

function actualizarMapa(){

    mapa.eachLayer(function(layer){

        if(layer instanceof L.Marker){

            mapa.removeLayer(layer);

        }

    });

    registros.forEach(persona=>{

        if(
        persona.lat &&
        persona.lng
        ){

            L.marker([
                persona.lat,
                persona.lng
            ])
            .addTo(mapa)
            .bindPopup(
                persona.nombre
            );

        }

    });

}

function limpiar(){

    document.getElementById("nombre").value="";
    document.getElementById("edad").value="";
    document.getElementById("sexo").value="";
    document.getElementById("estatura").value="";
    document.getElementById("peso").value="";
    document.getElementById("ojos").value="";
    document.getElementById("cabello").value="";
    document.getElementById("senas").value="";
    document.getElementById("vestimenta").value="";
    document.getElementById("fecha").value="";
    document.getElementById("lugar").value="";
    document.getElementById("telefono").value="";
    document.getElementById("foto").value="";

}

mostrarRegistros();
actualizarEstadisticas();