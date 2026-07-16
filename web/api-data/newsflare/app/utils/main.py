import jwt
import datetime
from flask import current_app

def encode_token(email, expiration_minutes=30):
    """
    Encodes a JWT token with the given email and expiration time.
    """
    token = jwt.encode(
        {'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=expiration_minutes)},
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    return token if isinstance(token, str) else token.decode('utf-8')

def decode_token(token):
    """
    Decodes a JWT token and returns the email if valid.
    Raises exceptions for expired or invalid tokens.
    """
    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return data['email']
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("Token expired.")
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError("Invalid token.")
