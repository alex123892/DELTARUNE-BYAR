function subirIdioma(){

    let nombre = document.getElementById("idioma").value;
    let archivo = document.getElementById("archivo").files[0];


    if(nombre == "" || !archivo){
        alert("Falta el nombre o el archivo");
        return;
    }


    let datos = new FormData();

    datos.append("nombre", nombre);
    datos.append("archivo", archivo);


    fetch("http://localhost:5000/subir", {
        method: "POST",
        body: datos
    })
    .then(r => r.text())
    .then(mensaje => {
        alert(mensaje);
    })
    .catch(error => {
        console.log(error);
        alert("Error al conectar con Python");
    });

}

let idiomas = [];

async function cargarIdiomas() {
    try {
        const respuesta = await fetch("idiomas.json");
        idiomas = await respuesta.json();

        const lista = document.getElementById("listaIdiomas");
        lista.innerHTML = "";

        idiomas.forEach(idioma => {
            const opcion = document.createElement("option");
            opcion.value = idioma.archivo;
            opcion.textContent = idioma.nombre;
            lista.appendChild(opcion);
        });
    } catch (e) {
        alert("No se pudieron cargar los idiomas.");
        console.error(e);
    }
}

function descargarIdioma() {
    const lista = document.getElementById("listaIdiomas");

    if (lista.selectedIndex === -1) {
        alert("Selecciona un idioma.");
        return;
    }

    const archivo = lista.value;

    const enlace = document.createElement("a");
    enlace.href = archivo;
    enlace.download = archivo.split("/").pop();

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

cargarIdiomas();