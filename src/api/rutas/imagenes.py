from ..modelos import Imagenes
from ..routes import app, api, request, jsonify
from firebase_admin import storage
import tempfile
from ..db import db

@api.route('/imagen', methods=['POST'])
def subir_imagen():
    # Se recibe un archivo en la peticion
    file=request.files['file']
    descripcion=request.form['descripcion']
    # Extraemos la extension del archivo
    extension=file.filename.split(".")[1]
    # Se crear el registro en la base de datos 
    imagen=Imagenes(detalle=descripcion)
    db.session.add(imagen)
    db.session.flush()
    # Se genera el nombre de archivo con el id de la imagen y la extension
    filename="falla/" + str(imagen.id) + "." + extension
    # Se actualiza el registro de la imagen con el nombre
    imagen.firebase_id=filename
    db.session.commit()
    # Guardar el archivo recibido en un archivo temporal
    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp.name)
    # Subir el archivo a firebase
    bucket=storage.bucket(name="tallerapp-4geeks.appspot.com")
    blob = bucket.blob(filename)
    blob.upload_from_filename(temp.name)
    
    return "Ok"

