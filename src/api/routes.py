"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Falla
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@app.route('/servicios', methods=['GET'])
def listado_fallas():
    fallas = Falla.query.all()
    return "Listado Servicios ok"

@app.route('/servicio/<int:falla_id>/', methods=['POST'])
def falla(falla_id):
    falla = Falla.query.get_or_404(falla_id)
    return "Detalle Servicio ok"

