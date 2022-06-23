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
    #prueba = "valor"
    return jsonify(falla.serialize())

@api.route('/falla', methods=['POST']) #ENDPOINT DE REGISTRAR
@jwt_required()
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

@api.route('/falla_user', methods=['GET'])
@jwt_required()
def listado_fallas_user():
    id_user=get_jwt_identity()
    fallas_user = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #Fallas asociadas a mi usuario
    fallas_user = list(map(lambda propuesta: propuesta.serialize(), fallas_user ))#me trajo fue las fallas asocidas a mi usuario
    return jsonify(fallas_user)