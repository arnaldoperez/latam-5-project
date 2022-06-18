"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .db import db
from api.modelos import User, Perfil_tecnico, Falla, Imagenes, Calificacion, TokenBlockedList, Propuesta, InformeTecnico
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
import datetime 
from firebase_admin import storage
import tempfile


app = Flask(__name__)
api = Blueprint('api', __name__)
bcrypt = Bcrypt(app)
#db = SQLAlchemy(app)
#jwt = JWTManager(app)
from api.rutas import signup, login, verifyToken, listado_fallas, crearFalla, falla, subir_imagen

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


""" @api.route('/fallas', methods=['GET'])
def listado_fallas():
    fallas = Falla.query.all()
    fallas = list(map(lambda falla: falla.serialize(), fallas ))
    return jsonify(fallas)
 """

""" @api.route('/falla/<int:falla_id>/', methods=['GET'])
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    return jsonify(falla.serialize()) """

""" @api.route('/signup', methods=['POST']) #ENDPOINT DE REGISTRAR
def signup():
    email=request.json.get("email")#capturando mi usuario email del requerimiento
    password=request.json.get("password")#capturando la contraseña de mi ususario
    password_encryptado = bcrypt.generate_password_hash(password, rounds=None).decode("utf-8") 
    nombre=request.json.get("nombre")
    apellido=request.json.get("apellido")
    fecha_ing=request.json.get("fecha_ing")
    newUser=User(email=email, password=password_encryptado, nombre=nombre, apellido=apellido, fecha_ing=fecha_ing, is_active= True)#creando mi nuevo usuario con el modelo (clase) que importe
    db.session.add(newUser)
    db.session.commit()
    response_body = {
        "message": "usuario creado exitosamente"
    }
    return jsonify(response_body), 201

# Login: endpoint que reciba un nombre de usuario y clave, lo verifique en la base de datos y genere el token
@api.route('/login', methods=['POST'])
def login():
    email=request.json.get("email")
    password=request.json.get("password")
    newUser=User.query.filter_by(email=email).first()
    # Verificamos si el usuario existe, buscandolo por el correo
    if not newUser:
        raise APIException("Usuario o Password no encontrado", status_code=401)
    # Se valida si la clave que se recibio en la peticion es valida
    clave_valida=bcrypt.check_password_hash(newUser.password, password)
    if not clave_valida:
        raise APIException("Clave invalida", status_code=401)
    # Se genera un token y se retorna como respuesta
    token=create_access_token(email)
    refreshToken=create_refresh_token(email)
    return jsonify({"token":token, "refreshToken":refreshToken}), 200    

@api.route('/verify-token',methods=['POST'])
@jwt_required()
def verifyToken():     
    userEmail=get_jwt_identity()
    if not userEmail:
        return "Token invalido", 401
    return "Token correcto", 200    """

@api.route('/logout', methods=['POST'])
@jwt_required()
def destroyToken():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlockedList(token=jti, created_at=now, email=get_jwt_identity()))
    db.session.commit()
    return jsonify(msg="Access token revoked")    

""" @api.route('/falla', methods=['POST']) #ENDPOINT DE REGISTRAR
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
    return jsonify(response_body), 201   """  

@api.route('/tecnicos', methods=['POST'])
def create_tecnico():

    historial=request.json.get("historial")
    ubicacion=request.json.get("ubicacion")
    descripcion=request.json.get("descripcion")
    id_user=request.json.get("id_user")
    url=request.json.get("url")
    nombre=request.json.get("nombre")
        
    newTecnico= Perfil_tecnico(id_user=id_user,historial=historial,ubicacion=ubicacion,descripcion=descripcion, url=url,is_active= True )
    db.session.add(newTecnico)
    db.session.commit()
    response_body = {
        "message": "usuario creado exitosamente"
    }
    return jsonify(response_body), 200

@api.route('/propuesta', methods=['POST']) #ENDPOINT DE PROPUESTA
def nuevapropuesta():
    detalle=request.json.get("detalle")#capturando destalle del requerimiento
    costo_servicio=request.json.get("costo_servicio")#capturando servicio del requerimiento
    estado=request.json.get("estado")#capturando estado del requerimiento
    id_falla=request.json.get("id_falla")#capturando falla del requerimiento
    id_tecnico=request.json.get("id_tecnico")#capturando tecnico del requerimiento
    newPropuesta=Propuesta(detalle=detalle, costo_servicio=costo_servicio, estado=estado, id_falla=id_falla, id_tecnico=id_tecnico, is_active=True)#creando propuesta con el modelo (clase) que importe
    db.session.add(newPropuesta)
    db.session.commit()
    response_body = {
        "message": "propuesta creada exitosamente"
    }
    return jsonify(response_body), 201

""" @api.route('/imagen', methods=['POST'])
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
    
    return "Ok" """

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

@api.route('/calificaciones', methods=['POST'])
def create_calification():

    calificacion=request.json.get("calificacion")
    comentario=request.json.get("comentario")
    id_tecnico=request.json.get("id_tecnico")
    propuesta_id=request.json.get("propuesta_id")
    fecha_cierre=request.json.get("fecha_cierre")
        
    newCalificacion= Calificacion(calificacion=calificacion,comentario=comentario,id_tecnico=id_tecnico,propuesta_id=propuesta_id, fecha_cierre=fecha_cierre)
    db.session.add(newCalificacion)
    db.session.commit()
    response_body = {
        "message": "Calificacion creado exitosamente"
    }
    return jsonify(response_body), 200

@api.route('/calificaciones', methods=['GET'])
def historial_calificacionestodos():
    historial = Calificacion.query.all()
    historial = list(map(lambda calificacion: calificacion.serialize(), historial ))
    return jsonify(historial)

@api.route('/calificaciones/<id_tecnico>', methods=['GET'])
def historial_calificaciones(id_tecnico):
    historial = Calificacion.query.get(id_tecnico)
    return jsonify(historial.serialize())