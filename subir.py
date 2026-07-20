from flask import Flask, request
import os
import json

app = Flask(__name__)

CARPETA_IDIOMAS = "idiomas"
LISTA = "idiomas.json"


@app.route("/")
def inicio():
    return "Servidor de idiomas funcionando"


@app.route("/subir", methods=["POST"])
def subir():

    nombre = request.form["nombre"]
    archivo = request.files["archivo"]


    if not os.path.exists(CARPETA_IDIOMAS):
        os.makedirs(CARPETA_IDIOMAS)


    ruta = os.path.join(
    CARPETA_IDIOMAS,
    nombre + ".json"
)


    archivo.save(ruta)


    if os.path.exists(LISTA):
        with open(LISTA, "r", encoding="utf-8") as f:
            lista = json.load(f)
    else:
        lista = []


    lista.append({
        "nombre": nombre,
        "archivo": ruta.replace("\\", "/")
    })


    with open(LISTA, "w", encoding="utf-8") as f:
        json.dump(
            lista,
            f,
            indent=4,
            ensure_ascii=False
        )


    return "Idioma subido correctamente"


app.run(
    host="localhost",
    port=5000
)