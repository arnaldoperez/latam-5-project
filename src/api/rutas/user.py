from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt
from ..routes import app, api, bcrypt, request, jsonify
from ..modelos import User, Perfil_tecnico, TokenBlockedList
from ..db import db
from datetime import datetime, timezone, timedelta
from api.utils import generate_sitemap, APIException

@api.route('/signup', methods=['POST']) #ENDPOINT DE REGISTRAR
def signup():
    email=request.json.get("email")#capturando mi usuario email del requerimiento
    password=request.json.get("password")#capturando la contraseña de mi ususario
    password_encryptado = bcrypt.generate_password_hash(password, rounds=None).decode("utf-8") # se procede a encriptar el password
    nombre=request.json.get("nombre")
    apellido=request.json.get("apellido")
    fecha_ing=datetime.now()
    newUser=User(email=email, password=password_encryptado, nombre=nombre, apellido=apellido, fecha_ing=fecha_ing, is_active= True)#creando mi nuevo usuario con el modelo (clase) que importe
    db.session.add(newUser)
    db.session.commit()
    response_body = {
        "id":newUser.id,
        "message": "usuario creado exitosamente"
    }
    return jsonify(response_body), 201

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
    # Consultar si tiene id tecnico para agregarlo al payload
    idTecnico=0
    perfilTecnico=Perfil_tecnico.query.filter_by(id_user=newUser.id).first()
    if(perfilTecnico!=None):
        idTecnico=perfilTecnico.id
    # Se genera un token y se retorna como respuesta
    token=create_access_token(newUser.id, additional_claims={"idTecnico":idTecnico})
    refreshToken=create_refresh_token(email)
    return jsonify({"token":token, "refreshToken":refreshToken, "esTecnico":perfilTecnico!=None, "id_tecnico": idTecnico}), 200     

@api.route('/verify-token',methods=['POST'])
@jwt_required()
def verifyToken():    
    userEmail=get_jwt_identity()
    if not userEmail:
        return "Token invalido", 401
    return "Token correcto", 200   

@api.route('/logout', methods=['POST'])
@jwt_required()
def destroyToken():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlockedList(token=jti, created_at=now, email=get_jwt_identity()))
    db.session.commit()
    return jsonify(msg="Access token revoked")