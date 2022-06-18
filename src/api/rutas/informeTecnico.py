from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, bcrypt, request, jsonify
from ..modelos import InformeTecnico
import datetime 
from ..db import db

@api.route('/informe_tecnico', methods=['POST']) 
def crear_informe_tecnico():

    # Recibiendo los datos de la peticion
    imagen=request.files['imagen']
    fecha_creacion = datetime.datetime.now()
    comentario_servicio=request.form['comentario_servicio']
    usuario_id=request.form['usuario_id']
    recomendacion=request.form['recomendacion']
    falla_id=request.form['falla_id']
    importe=request.form['importe']
    estado=request.form['estado']
    
    # Creamos el objeto del informe tecnico para la BD y lo guardamos
    newInforme= InformeTecnico(fecha_creacion=fecha_creacion,comentario_servicio=comentario_servicio,recomendacion=recomendacion,usuario_id=usuario_id, falla_id=falla_id,importe=importe,estado=estado)
    db.session.add(newInforme)
    db.session.flush()

    # Guardar el archivo recibido en un archivo temporal
    temp = tempfile.NamedTemporaryFile(delete=False)
    imagen.save(temp.name)
    
    # Se genera el nombre del archivo y la extension para poder guardarlo
    extension=imagen.filename.split(".")[1]
    firebase_id="informe/"+str(newInforme.id)+"."+extension

    # Subir el archivo a firebase
    bucket=storage.bucket(name="tallerapp-4geeks.appspot.com")
    blob = bucket.blob(firebase_id)
    blob.upload_from_filename(temp.name)

    # Se guardan los datos de la imagen en la base de datos con el nombre que le corresponde
    imagenDB=Imagenes(detalle="Informe tecnico " + str(newInforme.id), firebase_id=firebase_id)
    db.session.add(imagenDB)
    db.session.flush()

    # Actualizamos el campo imagen del informe, con el id de la imagen que se acaba de guardar
    newInforme.imagen_id=imagenDB.id
    db.session.commit()

    response_body = {
        "message": "informe creado exitosamente"
    }
    return jsonify(response_body), 201

@api.route('/informes', methods=['GET'])
def listar_informes():
    informes = InformeTecnico.query.all()
    informes = list(map(lambda informe: informe.serialize(), informes ))
    return jsonify(informes)

@api.route('/informe/<int:informe_id>', methods=['GET'])
def mostrar_informe(informe_id):
    informe = InformeTecnico.query.get_or_404(informe_id)
    return jsonify(informe.serialize())