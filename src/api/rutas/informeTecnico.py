from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, bcrypt, request, jsonify
from ..modelos import InformeTecnico, Imagenes, Falla, Propuesta
import datetime 
import tempfile
from firebase_admin import storage
from ..db import db

@api.route('/informe_tecnico', methods=['POST']) 
@jwt_required()
def crear_informe_tecnico():
    # Recibiendo los datos de la peticion
    token=get_jwt()
    idTecnico=token['idTecnico']
    if(idTecnico==0):
        return "Acceso no autorizado", 403
    print(idTecnico)
    #print(request.form)
    usuario_id = get_jwt_identity()
    fecha_creacion = datetime.datetime.now()    
    recomendacion=request.form['recomendacion']
    comentario_servicio=request.form['comentario']
    falla_id=request.form['idFalla']
    importe=request.form['importe']
    imagen=request.files['imagen']
    estado="open"
    
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

@api.route('/informes', methods=['GET'])
@jwt_required()
def listar_informes():
    informes = InformeTecnico.query.all()
    informes = list(map(lambda informe: informe.serialize(), informes ))
    return jsonify(informes)

@api.route('/informe/<int:informe_id>', methods=['GET'])
@jwt_required()
def mostrar_informe(informe_id):
    informe = InformeTecnico.query.get_or_404(informe_id)
    imagen=Imagenes.query.filter(Imagenes.id==informe.imagen_id).first()
    bucket=storage.bucket(name="tallerapp-4geeks.appspot.com")
    blob = bucket.blob(imagen.firebase_id)
    respuesta=informe.serialize()
    respuesta["imagen"]=blob.generate_signed_url(version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(minutes=15),
        # Allow GET requests using this URL.
        method="GET")
    return jsonify(respuesta)


'''@api.route('/propuestas', methods=['GET'])
@jwt_required()
def listado_propuestas():
id_user=get_jwt_identity()
propuestas = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #propuestas asociadas a la falla de mi usuario
propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))
return jsonify(propuestas)'''

@api.route('/informeUser', methods=['GET'])
@jwt_required()
def listado_informes_user():
    id_user=get_jwt_identity()
    id_fallas = Falla.query.filter(Falla.id_cliente==id_user).filter(Falla.id==Propuesta.id_falla).all() #Fallas asociadas a mi usuario
    id_fallas=list(map(lambda falla: falla.id, id_fallas))    
    #propuestastodos = Propuesta.query.all()
    #propuestastodos =list(map(lambda propuesta: propuesta.serialize(), propuestastodos ))
    #propuestas_user=[]
    #for propuest in propuestastodos:
        #for index in id_fallas:
            #if(propuest["id_falla"]==index):
                #propuestas_user.append(propuest)        
                #propuestas_user.append(propuest)  
    #propuestas = list(map(lambda propuesta: propuesta.serialize(), propuestas ))#me trajo fue las fallas asocidas a mi usuario
    
    #propuestas_user=list(map(lambda propuesta: propuesta["id"], propuestas_user))#aca tengo los ids de las propuestas asociadas a las fallas de mi usuario
    informes_todos=InformeTecnico.query.all() #aca tengo todos los informes creados
    informes_todos =list(map(lambda informe: informe.serialize(), informes_todos ))    
    informes=[]    
    for informe in informes_todos:
        for index in id_fallas:
            if (informe["falla_id"]==index):
                informes.append(informe)

    return jsonify(informes)