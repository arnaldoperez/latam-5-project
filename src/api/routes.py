"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Perfil_tecnico, Falla, Imagenes
from api.utils import generate_sitemap, APIException
import datetime 
from firebase_admin import storage
import tempfile

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/servicios', methods=['GET'])
def listado_fallas():
    fallas = Falla.query.all()
    fallas = list(map(lambda falla: falla.serialize(), fallas ))
    return jsonify(fallas)


@api.route('/servicio/<int:falla_id>/', methods=['GET'])
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    return "Detalle Servicio ok"

@api.route('/signup', methods=['POST']) #ENDPOINT DE REGISTRAR
def signup():
    email=request.json.get("email")#capturando mi usuario email del requerimiento
    password=request.json.get("password")#capturando la contraseña de mi ususario
    nombre=request.json.get("nombre")
    apellido=request.json.get("apellido")
    fecha_ing=request.json.get("fecha_ing")
    newUser=User(email=email, password=password, nombre=nombre, apellido=apellido, fecha_ing=fecha_ing, is_active= True)#creando mi nuevo usuario con el modelo (clase) que importe
    db.session.add(newUser)
    db.session.commit()
    response_body = {
        "id":newUser.id,
        "message": "usuario creado exitosamente"
    }
    return jsonify(response_body), 201

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
    return jsonify(response_body), 201    

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
    newPropuesta=Propuesta(detalle=detalle, costo_servicio=costo_servicio, estado=estado, id_falla=id_falla, id_tecnico=id_tecnico)#creando propuesta con el modelo (clase) que importe
    db.session.add(newPropuesta)
    db.session.commit()
    response_body = {
        "message": "propuesta creada exitosamente"
    }
    return jsonify(response_body), 201

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
    
    
