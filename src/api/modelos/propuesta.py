from ..db import db

class Propuesta(db.Model):
    __tablename__ = 'propuesta'
    id = db.Column(db.Integer, primary_key=True)
    detalle = db.Column(db.String(120),  nullable=False)
    costo_servicio = db.Column(db.String(80), nullable=False)
    estado = db.Column(db.String(120),  nullable=False)
    id_falla = db.Column(db.Integer, db.ForeignKey('falla.id'))
    calificacion = db.relationship('Calificacion',lazy=True,backref='propuesta')
    id_tecnico = db.Column(db.Integer, db.ForeignKey('perfil_tecnico.id'))
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
        }