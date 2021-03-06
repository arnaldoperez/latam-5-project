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
@jwt_required()
def listado_propuestas():
    id_user=get_jwt_identity()
    id_fallas = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #Fallas asociadas a mi usuario
    id_fallas=list(map(lambda falla: falla.id, id_fallas))    
    propuestastodos = Propuesta.query.all()
    propuestastodos =list(map(lambda propuesta: propuesta.serialize(), propuestastodos ))
    propuestas_user=[]
    for propuest in propuestastodos:
        for index in id_fallas:
            if(propuest["id_falla"]==index):
                propuestas_user.append(propuest)
        print(propuestas_user)
                #propuestas_user.append(propuest)  
    #propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))#me trajo fue las fallas asocidas a mi usuario
      
    
    return jsonify(propuestas_user)


@api.route('/propuestas/<id_propuesta>', methods=['GET'])
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



@api.route('/propuesta_user/<int:tecnico_id>', methods=['GET'])
@jwt_required()
def listar_propuestas_user(tecnico_id):
    print(tecnico_id)
    token=get_jwt()
    idTecnico=token['idTecnico']
    print(idTecnico)
    if(idTecnico==0):
        return "Acceso no autorizado", 403
    propuestas = Propuesta.query.filter(Propuesta.id_tecnico==tecnico_id).all() #propuestas asociadas a la falla de mi usuario
    propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))
    return jsonify(propuestas)

@api.route('/detalle_propuesta/<int:id>', methods=['GET'])
@jwt_required()
def mostrar_propuesta(id):
    propuesta = Propuesta.query.get_or_404(id)
    return jsonify(propuesta.serialize())

@api.route('/aceptar_propuesta/<int:id_propuesta>', methods=['POST'])
def cambiar_estado_propuesta(id_propuesta):
    propuesta = Propuesta.query.filter_by(id=id_propuesta).first()
    propuesta.estado="aceptada"
    db.session.add(propuesta)
    db.session.commit()  
    return jsonify(propuesta.serialize()) 

@api.route('/declinar_propuesta/<int:id_propuesta>', methods=['POST'])
def cambiar_estado_propuesta2(id_propuesta):
    propuesta = Propuesta.query.filter_by(id=id_propuesta).first()
    propuesta.estado="declinada"
    db.session.add(propuesta)
    db.session.commit()  
    return jsonify(propuesta.serialize()) 

@api.route('/propuestas_aprobadas/<int:tecnico_id>', methods=['GET'])
@jwt_required()
def propuestas_aprobadas(tecnico_id):
    print(tecnico_id)
    token=get_jwt()
    idTecnico=token['idTecnico']
    print(idTecnico)
    if(idTecnico==0):
        return "Acceso no autorizado", 403
    propuestas = Propuesta.query.filter(Propuesta.id_tecnico==tecnico_id).filter(Propuesta.estado=="aceptada") #propuestas asociadas a la falla de mi usuario
    propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))
    return jsonify(propuestas)

@api.route('/propuestas_no_aceptadas/<int:tecnico_id>', methods=['GET'])
@jwt_required()
def propuestas_no_aceptadas(tecnico_id):
    print(tecnico_id)
    token=get_jwt()
    idTecnico=token['idTecnico']
    print(idTecnico)
    if(idTecnico==0):
        return "Acceso no autorizado", 403
    propuestas = Propuesta.query.filter(Propuesta.id_tecnico==tecnico_id).filter(Propuesta.estado=="No aceptada") #propuestas asociadas a la falla de mi usuario
    propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))
    return jsonify(propuestas)
