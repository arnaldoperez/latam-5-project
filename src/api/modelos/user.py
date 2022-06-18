from flask_sqlalchemy import SQLAlchemy
from ..db import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nombre = db.Column(db.String(120), nullable=False)
    apellido = db.Column(db.String(120), nullable=False)
    fecha_ing = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    perfil_tecnico = db.relationship('Perfil_tecnico', backref='user')
    falla = db.relationship('Falla',lazy=True,backref='user')
    informe_tecnico = db.relationship('InformeTecnico',lazy=True,backref='user')

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