from ..db import db

class Calificacion(db.Model):
    __tablename__ = 'calificacion'
    id = db.Column(db.Integer, primary_key=True)
    calificacion = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(250), nullable=False)
    id_tecnico = db.Column(db.Integer, db.ForeignKey('perfil_tecnico.id'))
    propuesta_id = db.Column(db.Integer, db.ForeignKey('propuesta.id'))
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