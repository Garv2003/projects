from flask import Blueprint, request, render_template, url_for
from app.models.subscriber import Subscriber
from app import db
import jwt
from app.email.email_service import send_email
from app.utils.main import encode_token, decode_token

main_bp = Blueprint('main_bp', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form['email']
    
    if Subscriber.query.filter_by(email=email).first():
        return render_template("message.html", message="Email already exists.", description="This email is already subscribed.", url="/", action="Home")

    new_subscriber = Subscriber(email=email)
    db.session.add(new_subscriber)
    db.session.commit()

    token = encode_token(email)
    confirm_url = url_for('main_bp.confirm_email', token=token, _external=True)
    send_email(email, 'Confirm your subscription', render_template('email/confirmation.html', confirm_url=confirm_url))

    return render_template("message.html", message="A confirmation email has been sent.", description="Please check your email to confirm your subscription.", url="/", action="Home")

@main_bp.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = decode_token(token)
        subscriber = Subscriber.query.filter_by(email=email).first()
        
        if subscriber:
            subscriber.confirmed = True
            db.session.commit()
            return render_template("message.html", message="Email confirmed.", description="Thank you for confirming your email address.", url="/", action="Home")
        else:
            return render_template("message.html", message="Email not found.", description="The email is not found.", url="/", action="Home")
    except jwt.ExpiredSignatureError:
        return render_template("message.html", message="Token expired.", description="Please try again.", url="/", action="Home")
    except jwt.InvalidTokenError:
        return render_template("message.html", message="Invalid token.", description="Please request a new one.", url="/", action="Home")

@main_bp.route('/unsubscribe/<token>')
def unsubscribe(token):
    try:
        email = decode_token(token)
        subscriber = Subscriber.query.filter_by(email=email).first()
        
        if subscriber:
            db.session.delete(subscriber)
            db.session.commit()
            return render_template("message.html", message="Unsubscribed.", description="You have been unsubscribed.", url="/", action="Home")
        else:
            return render_template("message.html", message="Email not found.", description="The email is not found.", url="/", action="Home")
    except jwt.ExpiredSignatureError:
        return render_template("message.html", message="Token expired.", description="Please try again.", url="/", action="Home")
    except jwt.InvalidTokenError:
        return render_template("message.html", message="Invalid token.", description="Please request a new one.", url="/", action="Home")
