"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register_new_user():
    data = request.get_json()
    data_email = data.get("email", None)
    data_password = data.get("password", None)

    hashed_password = generate_password_hash(data_password)
    new_user = User(email=data_email, password=hashed_password, is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify("User created successfully!"), 201
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": error.args}), 500
    

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email_data = data.get("email", None)
    password_data = data.get("password", None)

    user = User.query.filter_by(email=email_data).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    password_matches = check_password_hash(user.password, password_data)
    if not password_matches:
        return jsonify({"error": "Incorrect password"}), 401
    
    token_object = {"id": user.id, "email": user.email}
    token = create_access_token(token_object)
    print(token)
    return jsonify({"token": token}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_information():
    user = get_jwt_identity()
    if not user:
        return jsonify({"error": "user not found"}), 404
    
    return jsonify({"data": user}), 200