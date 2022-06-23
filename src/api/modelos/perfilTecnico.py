from ..db import db
from ..modelos import User

class Perfil_tecnico(db.Model):

    __tablename__ = 'perfil_tecnico'

    id = db.Column(db.Integer, primary_key=True)
    historial = db.Column(db.String(120), nullable=False)
    ubicacion = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(120), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    propuesta = db.relationship('Propuesta',lazy=True, backref='perfil_tecnico')
    calificacion = db.relationship('Calificacion', backref='perfil_tecnico')
  
    def __repr__(self):
        return f'<Perfil_tecnico {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "historial": self.historial,
            "ubicacion": self.ubicacion,
            "descripcion": self.descripcion,
            "url": self.url,
            "id_user":self.id_user, 
            "is_active":self.is_active,
            "tecnico_nombre":self.user.nombre,
            "tecnico_apellido":self.user.apellido,
            "tecnico_email":self.user.email
        }