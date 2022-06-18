from ..db import db
class Falla(db.Model):
    __tablename_ = 'falla'
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(500),  nullable=False)  
    modelo = db.Column(db.String(120),  nullable=False)    
    fecha_creacion= db.Column(db.Date, nullable=False)
    fecha_cierre= db.Column(db.String(10), nullable=True)
    titulo = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(20), nullable=False)
    ubicacion = db.Column(db.String(200),  nullable=False)
    id_cliente = db.Column(db.Integer, db.ForeignKey('user.id'))
    imagen_id = db.Column(db.Integer, db.ForeignKey('imagenes.id'))
    informe_tecnico = db.relationship('InformeTecnico',lazy=True,backref='falla')
    propuesta = db.relationship('Propuesta', backref="falla")

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
            "usuario" : self.id_cliente,
            "imagen" : self.imagen_id
            }