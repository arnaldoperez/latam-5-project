from ..db import db

class InformeTecnico(db.Model):
    __tablename__ = 'informe_tecnico'
    id = db.Column(db.Integer, primary_key=True)
    fecha_creacion= db.Column(db.Date, nullable=False)
    comentario_servicio = db.Column(db.String(250), nullable=False)
    recomendacion = db.Column(db.String(250), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    falla_id = db.Column(db.Integer, db.ForeignKey('falla.id'))
    importe = db.Column(db.Float)
    estado = db.Column(db.String(40), nullable=False)
    imagen_id = db.Column(db.Integer, db.ForeignKey('imagenes.id'), nullable=True)
    
    def __repr__(self):
        return f'<InformeTecnico {self.id}>'

    def serialize(self):
        return {
            'id': self.id,           
            'fecha_creacion': self.fecha_creacion,
            'comentario_servicio': self.comentario_servicio,
            'recomendacion': self.recomendacion,
            'usuario_id': self.usuario_id,
            'falla_id': self.falla_id,
            'importe': self.importe,
            'estado': self.estado,
            'imagen_id': self.imagen_id,
            'falla_titulo': self.falla.titulo,
            'cliente_nombre': self.falla.user.nombre,
            'cliente_apellido': self.falla.user.apellido
        }