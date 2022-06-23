from ..routes import app, api, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..modelos import Falla
import datetime
from ..db import db

@api.route('/falla', methods=['POST']) 
@jwt_required()
def crear_falla():
    # Recibiendo los datos de la peticion
    token=get_jwt()

    
    #print(request.form)
    fecha_creacion = datetime.datetime.now()    
    descripcion=request.form['descripcion']
    modelo=request.form['modelo']
    ubicacion=request.files['ubicacion']
    id_cliente=get_jwt_identity()
    imagen_id=request.files['imagen_id']

    
    # Creamos el objeto de falla para la BD y lo guardamos
    newFalla= falla(fecha_creacion=fecha_creacion,descripcion=descripcion,modelo=modelo,ubicacion=ubicacion, id_cliente=id_cliente,imagen_id=imagen_id)
    print(newFalla)
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
    imagenDB=Imagenes(detalle="falla " + str(newInforme.id), firebase_id=firebase_id)
    db.session.add(imagenDB)
    db.session.flush()

    # Actualizamos el campo imagen del informe, con el id de la imagen que se acaba de guardar
    newInforme.imagen_id=imagenDB.id
    db.session.commit()

    response_body = {
        "message": "falla creada exitosamente"
    }
    return jsonify(response_body), 201

"""@api.route('/fallas', methods=['GET'])
def listado_fallas():
    fallas = Falla.query.all()
    fallas = list(map(lambda falla: falla.serialize(), fallas ))
    return jsonify(fallas)

@api.route('/falla/<int:falla_id>/', methods=['GET'])
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    #prueba = "valor"
    return jsonify(falla.serialize())

@api.route('/falla', methods=['POST']) #ENDPOINT DE REGISTRAR
def crearFalla():
    id=request.json.get("id")#capturando mi usuario email del requerimiento
    descripcion=request.json.get("descripcion")#capturando la contraseña de mi ususario
    modelo=request.json.get("modelo")
    date=datetime.datetime.now()
    fecha_creacion= date.strftime("%x")
    fecha_cierre=request.json.get("fecha_cierre")
    titulo = request.json.get("titulo")
    estado = request.json.get("estado")
    ubicacion = request.json.get("ubicacion")
    id_cliente = request.json.get("id_cliente")
    newPost=Falla(descripcion=descripcion, modelo=modelo, fecha_creacion=fecha_creacion, fecha_cierre=fecha_cierre, titulo=titulo, estado=estado, ubicacion=ubicacion, id_cliente=id_cliente)#creando mi nuevo usuario con el modelo (clase) que importe
    db.session.add(newPost)
    db.session.commit()
    response_body = {
        "message": "Falla creada exitosamente"
    }
    return jsonify(response_body), 201  """