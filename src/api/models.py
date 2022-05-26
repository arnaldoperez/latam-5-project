from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Falla(db.Model):

    __tablename_ = 'falla'
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)  
    modelo = db.Column(db.String(120), unique=False, nullable=False)    
    fecha_creacion= db.Column(db.Integer, unique=False, nullable=False)  
    fecha_cierre= db.Column(db.Integer, unique=False, nullable=False)
    titulo = db.Column(db.String(100),unique=False, nullable=False)
    estado = db.Column(db.String(5),unique=False, nullable=False)
    ubicacion = db.Column(db.String(200), unique=False, nullable=False)
    id_cliente = db.Column(db.Integer, ForeignKey= 'user.id')
    usuario = relationship(User)

    def serialize(self):
        return{
            "id": self.id,
            "descripcion" : self.descripcion,
            "modelo" : self.modelo,
            "fecha_creacion" : self.fecha_creacion,
            "fecha_cierre" : self.fecha_cierre,
            "titulo" : self.titulo,
            "estado" : self,estado,
            "ubicacion" : self.ubicacion,
            "usuario" : self.id_cliente
            }

