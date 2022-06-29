from ..db import db

class Imagenes(db.Model):
    __tablename__ = 'imagenes'
    id = db.Column(db.Integer, primary_key=True)
    detalle = db.Column(db.String(120), nullable=True)
    firebase_id = db.Column(db.String(80), unique=True, nullable=True)
    falla = db.relationship('Falla', backref='imagenes')
    informe_tecnico = db.relationship('InformeTecnico', backref='imagenes')

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id":self.id,
            "detalle":self.detalle,
            "firebase_id":self.firebase_id,
            "public_url":self.public_url
        }