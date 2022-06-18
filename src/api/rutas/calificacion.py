from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, bcrypt, request, jsonify
from ..modelos import Calificacion
import datetime 
from ..db import db

@api.route('/calificaciones', methods=['POST'])
def create_calification():

    calificacion=request.json.get("calificacion")
    comentario=request.json.get("comentario")
    id_tecnico=request.json.get("id_tecnico")
    propuesta_id=request.json.get("propuesta_id")
    date=datetime.datetime.now()
    fecha_cierre= date.strftime("%x")
    #fecha_cierre=request.json.get("fecha_cierre")
    newCalificacion= Calificacion(calificacion=calificacion,comentario=comentario,propuesta_id=propuesta_id, fecha_cierre=fecha_cierre)
    db.session.add(newCalificacion)
    db.session.flush()
    cierre_falla=newCalificacion.propuesta.falla#aca se crea objeto con parametros de falla a partir de las relaciones definidas en Los modelos Calificacion y Propuesta
    cierre_falla.fecha_cierre=newCalificacion.fecha_cierre
    db.session.add(cierre_falla)
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