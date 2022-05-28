"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
<<<<<<< HEAD
from api.models import db, User, Falla
=======
from api.models import db, User, Perfil_tecnico
>>>>>>> 3aa2dbfb3f73ab6899f2abe0517c3163fef02e29
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

<<<<<<< HEAD

@app.route('/servicios', methods=['GET'])
def listado_fallas():
    fallas = Falla.query.all()
    return "Listado Servicios ok"

@app.route('/servicio/<int:falla_id>/', methods=['POST'])
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    return "Detalle Servicio ok"

=======
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
        "message": "usuario creado exitosamente"
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
>>>>>>> 3aa2dbfb3f73ab6899f2abe0517c3163fef02e29
