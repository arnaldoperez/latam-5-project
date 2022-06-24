from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, request, jsonify
from ..modelos import Falla, Propuesta
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
    return jsonify(falla.serialize())

@api.route('/crear_falla', methods=['POST']) #ENDPOINT DE REGISTRAR
@jwt_required()
def crearFalla():
    usuario_id = get_jwt_identity()
    titulo = request.json.get("titulo")
    modelo=request.json.get("modelo")
    descripcion=request.json.get("descripcion")#capturando la contraseña de mi ususario
    ubicacion = request.json.get("ubicacion")
    imagen=request.files['imagen']
    date=datetime.datetime.now()
    fecha_creacion= date.strftime("%x")
    fecha_cierre=request.json.get("fecha_cierre")
    
    estado = request.json.get("estado")
    
    id_cliente = request.json.get("id_cliente")
   
    falla_id=request.form['idFalla']
    importe=request.form['importe']
     # Creamos el objeto del informe tecnico para la BD y lo guardamos
    newInforme= InformeTecnico(fecha_creacion=fecha_creacion,comentario_servicio=comentario_servicio,recomendacion=recomendacion,usuario_id=usuario_id, falla_id=falla_id,importe=importe,estado=estado)
    print(newInforme)
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
    blob.upload_from_filename(temp.name,content_type="image/"+extension)

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

@api.route('/falla_user', methods=['GET'])
@jwt_required()
def listado_fallas_user():
    id_user=get_jwt_identity()
    fallas_user = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #Fallas asociadas a mi usuario
    fallas_user = list(map(lambda propuesta: propuesta.serialize(), fallas_user ))#me trajo fue las fallas asocidas a mi usuario
    return jsonify(fallas_user)

