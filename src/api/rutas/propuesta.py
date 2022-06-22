from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, bcrypt, request, jsonify
from ..modelos import Propuesta, Falla
from ..db import db

@api.route('/propuestas', methods=['POST']) #ENDPOINT DE PROPUESTA
@jwt_required()
def nuevapropuesta():
    userId=get_jwt_identity()
    token=get_jwt()
    print(token)
    print(userId)
    idTecnico=token['idTecnico']
    if(idTecnico==0):
        return "Acceso no autorizado", 403

    detalle=request.json.get("detalle")#capturando destalle del requerimiento
    costo_servicio=request.json.get("costo_servicio")#capturando servicio del requerimiento
    estado=request.json.get("estado")#capturando estado del requerimiento
    id_falla=request.json.get("id_falla")#capturando falla del requerimiento
    id_tecnico=idTecnico#request.json.get("id_tecnico")#capturando tecnico del requerimiento
    newPropuesta=Propuesta(detalle=detalle, costo_servicio=costo_servicio, estado=estado, id_falla=id_falla, id_tecnico=id_tecnico, is_active=True)#creando propuesta con el modelo (clase) que importe
    db.session.add(newPropuesta)
    db.session.commit()
    response_body = {
        "message": "propuesta creada exitosamente"
    }
    return jsonify(response_body), 201

@api.route('/propuestas', methods=['GET'])
def historial_propuestasTodos():
    propuestas = Propuesta.query.all()
    propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))
    return jsonify(propuestas)

@api.route('/propuestas/detalles', methods=['GET'])
@jwt_required()
def historial_propuestauser():
      
    id_user=get_jwt_identity()


    id_mis_fallas=Falla.query.filter_by(id_cliente=id_user).all()
    id_mis_fallas=list(map(lambda falla: falla.propuestas(), id_mis_fallas ))
    print(id_mis_fallas)
    for id in id_mis_fallas:
        print(id.serialize())
    id_mis_fallas.fecha_cierre=newCalificacion.fecha_cierre

    historialpropuestas = Propuesta.query.filter_by(id_user=id_user).all()
    print(historialTecnico)        
    historialpropuestas = list(map(lambda calificacion: propuesta.serialize(), historialpropuestas ))
    
    print(historialpropuestas)
    return jsonify(historialpropuestas)