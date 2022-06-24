from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, request, jsonify
from ..modelos import Falla, Propuesta, Imagenes
import tempfile
from firebase_admin import storage
import datetime
from ..db import db

@api.route('/fallas', methods=['GET'])
@jwt_required()
def listado_fallas():
    fallas = Falla.query.all()
    fallas = list(map(lambda falla: falla.serialize(), fallas ))
    return jsonify(fallas)

@api.route('/falla/<int:falla_id>/', methods=['GET'])
@jwt_required()
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    respuesta=falla.serialize()
    if falla.imagen_id:
        imagen=Imagenes.query.filter(Imagenes.id==falla.imagen_id).first()
        bucket=storage.bucket(name="tallerapp-4geeks.appspot.com")
        blob = bucket.blob(imagen.firebase_id)
        respuesta.imagen=blob.generate_signed_url(version="v4",
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(minutes=15),
            # Allow GET requests using this URL.
            method="GET")
    return jsonify(respuesta)

@api.route('/crear_falla', methods=['POST']) #ENDPOINT DE REGISTRAR
@jwt_required()
def crearFalla():
    id_cliente = get_jwt_identity()
    titulo = request.form['titulo']
    modelo=request.form['modelo']
    descripcion=request.form['descripcion']
    ubicacion = request.form['ubicacion']
    imagen=request.files['imagen']
    estado=request.form['estado']
    fecha_creacion= datetime.datetime.now()
    
     # Creamos el objeto del informe tecnico para la BD y lo guardamos
    newFalla= Falla(id_cliente=id_cliente,titulo=titulo,modelo=modelo,descripcion=descripcion,ubicacion=ubicacion,estado=estado,fecha_creacion=fecha_creacion)
    #print(newInforme)
    db.session.add(newFalla)
    db.session.flush()

    # Guardar el archivo recibido en un archivo temporal
    temp = tempfile.NamedTemporaryFile(delete=False)
    imagen.save(temp.name)
    
    # Se genera el nombre del archivo y la extension para poder guardarlo
    extension=imagen.filename.split(".")[1]
    firebase_id="falla/"+str(newFalla.id)+"."+extension

    # Subir el archivo a firebase
    bucket=storage.bucket(name="tallerapp-4geeks.appspot.com")
    blob = bucket.blob(firebase_id)
    blob.upload_from_filename(temp.name,content_type="image/"+extension)

    # Se guardan los datos de la imagen en la base de datos con el nombre que le corresponde
    imagenDB=Imagenes(detalle="Falla " + str(newFalla.id), firebase_id=firebase_id)
    db.session.add(imagenDB)
    db.session.flush()

    # Actualizamos el campo imagen del informe, con el id de la imagen que se acaba de guardar
    newFalla.imagen_id=imagenDB.id
    db.session.commit()

    response_body = {
        "message": "Falla creada exitosamente"
    }
    return jsonify(response_body), 201

@api.route('/falla_user', methods=['GET'])
@jwt_required()
def listado_fallas_user():
    id_user=get_jwt_identity()
    fallas_user = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #Fallas asociadas a mi usuario
    fallas_user = list(map(lambda propuesta: propuesta.serialize(), fallas_user ))#me trajo fue las fallas asocidas a mi usuario
    return jsonify(fallas_user)

@api.route('/listarFallasAbiertas', methods=['GET'])
@jwt_required()
def listarFallasAbiertas():
    fallas = Falla.query.filter(Falla.estado=="abierta").all() 
    fallas = list(map(lambda falla: falla.serialize(), fallas ))
    return jsonify(fallas)
