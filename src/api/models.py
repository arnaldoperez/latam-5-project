from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nombre = db.Column(db.String(120), nullable=False)
    apellido = db.Column(db.String(120), nullable=False)
    fecha_ing = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "fecha_ing": self.fecha_ing
            # do not serialize the password, its a security breach
        }

class TokenBlockedList(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    token=db.Column(db.String(200), unique=True, nullable=False)
    email=db.Column(db.String(200), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "token":self.token,
            "email":self.email,
            "created_at":self.created_at
        }
      
class Perfil_tecnico(db.Model):

    __tablename__ = 'perfil_tecnico'

    id = db.Column(db.Integer, primary_key=True)
    historial = db.Column(db.String(120), nullable=False)
    ubicacion = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(120), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User',lazy=True,backref='perfil_tecnico')
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
  
    def __repr__(self):
        return f'<User {self.historial}>'

    def serialize(self):
        return {
            "id": self.id,
            "historial": self.historial,
            "ubicacion": self.ubicacion,
            "descripcion": self.descripcion,
            "url": self.url,
            "fecha_ing": self.fecha_ing,
            "id_user":self.id_user 
            # do not serialize the password, its a security breach
        }

class Falla(db.Model):

    __tablename_ = 'falla'
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(500),  nullable=False)  
    modelo = db.Column(db.String(120),  nullable=False)    
    fecha_creacion= db.Column(db.String(10),  nullable=False)  
    fecha_cierre= db.Column(db.String(10), nullable=True)
    titulo = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(5), nullable=False)
    ubicacion = db.Column(db.String(200),  nullable=False)
    id_cliente = db.Column(db.Integer, db.ForeignKey('user.id'))
    usuario = db.relationship('User',lazy=True,backref='falla')

    def serialize(self):
        return{
            "id": self.id,
            "descripcion" : self.descripcion,
            "modelo" : self.modelo,
            "fecha_creacion" : self.fecha_creacion,
            "fecha_cierre" : self.fecha_cierre,
            "titulo" : self.titulo,
            "estado" : self.estado,
            "ubicacion" : self.ubicacion,
            "usuario" : self.id_cliente
            }

class Propuesta(db.Model):
    __tablename__ = 'propuesta'
    id = db.Column(db.Integer, primary_key=True)
    detalle = db.Column(db.String(120),  nullable=False)
    costo_servicio = db.Column(db.String(80), nullable=False)
    estado = db.Column(db.String(120),  nullable=False)
    id_falla = db.Column(db.Integer, db.ForeignKey('falla.id'))
    falla = db.relationship(Falla)
    id_tecnico = db.Column(db.Integer, db.ForeignKey('perfil_tecnico.id'))
    perfil_tecnico = db.relationship('Perfil_tecnico',lazy=True,backref='propuesta')
    is_active = db.Column(db.Boolean(),  nullable=False)
  
    def __repr__(self):
        return f'<User {self.estado}>'

    def serialize(self):
        return {
            "id": self.id,
            "detalle": self.detalle,
            "costo_servicio": self.costo_servicio,
            "estado": self.estado,
            "id_falla": self.id_falla,
            "id_tecnico": self.id_tecnico

            # do not serialize the password, its a security breach
        }


class Calificacion(db.Model):
    __tablename__ = 'calificacion'
    id = db.Column(db.Integer, primary_key=True)
    calificacion = db.Column(db.String(50), nullable=False)
    comentario = db.Column(db.String(250), nullable=False)
    id_tecnico = db.Column(db.Integer, db.ForeignKey('perfil_tecnico.id'))
    perfil_tecnico = db.relationship(Perfil_tecnico)
    propuesta_id = db.Column(db.Integer, db.ForeignKey('propuesta.id'))
    propuesta = db.relationship('Propuesta',lazy=True,backref='calificacion')
    fecha_cierre= db.Column(db.String(10), nullable=False)
    

    def serialize(self):
        return {
            'id': self.id,           
            'calificacion': self.calificacion,
            'comentario': self.comentario,
            'id_tecnico': self.id_tecnico,
            'propuesta_id': self.propuesta_id,
            'fecha_cierre': self.fecha_cierre
        }


class Imagenes(db.Model):
    __tablename__ = 'imagenes'
    id = db.Column(db.Integer, primary_key=True)
    detalle = db.Column(db.String(120), nullable=True)
    firebase_id = db.Column(db.String(80), unique=True, nullable=True)
  
    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id":self.id,
            "detalle":self.detalle,
            "firebase_id":self.firebase_id,
            "public_url":self.public_url
        }

class InformeTecnico(db.Model):
    __tablename__ = 'informe_tecnico'
    id = db.Column(db.Integer, primary_key=True)
    fecha_creacion= db.Column(db.Date, nullable=False)
    comentario_servicio = db.Column(db.String(250), nullable=False)
    recomendacion = db.Column(db.String(250), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    usuario = db.relationship('User',lazy=True,backref='informe_tecnico')
    falla_id = db.Column(db.Integer, db.ForeignKey('falla.id'))
    falla = db.relationship('Falla',lazy=True,backref='informe_tecnico')
    importe = db.Column(db.Float)
    estado = db.Column(db.String(40), nullable=False)

    def serialize(self):
        return {
            'id': self.id,           
            'fecha_creacion': self.fecha_creacion,
            'comentario_servicio': self.comentario_servicio,
            'recomendacion': self.recomendacion,
            'usuario_id': self.usuario_id,
            'falla_id': self.falla_id,
            'importe': self.importe,
            'estado': self.estado
        }
