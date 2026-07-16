from flask import Flask,render_template,url_for 
from apscheduler.schedulers.background import BackgroundScheduler
from flask_sqlalchemy import SQLAlchemy
from app.utils.main import encode_token
import requests
import os

db = SQLAlchemy()
scheduler = BackgroundScheduler()

def create_app():
    app = Flask(__name__)
    
    app.config.from_pyfile('../config.py')

    # Initialize extensions
    db.init_app(app)

    # Register blueprints (routes)
    from app.routes.routes import main_bp
    app.register_blueprint(main_bp)

    # Schedule the daily news job
    from app.models.subscriber import Subscriber
    from app.email.email_service import send_email
    
    def send_daily_news():
        with app.app_context():
            print("Attempting to send daily news...")
            try:
                subscribers = Subscriber.query.filter_by(confirmed=True).all()
                print(f"Sending daily news to {len(subscribers)} subscribers...", subscribers)
                if not subscribers:
                    print("No subscribers found.")
                    return
                
                key=os.environ.get('NEWS_API_KEY')
                res=requests.get('https://newsapi.org/v2/top-headlines?country=us&apiKey='+key)
                data=res.json()
                articles=data['articles']
                
                for subscriber in subscribers:
                    
                    unsubscribeUrl=url_for('main_bp.unsubscribe', token=encode_token(subscriber.email), _external=True)
                    
                    send_email(subscriber.email, 'Daily News', render_template('email/daily_news.html', articles=articles, unsubscribeUrl=unsubscribeUrl))
                print("Emails sent successfully!")
            except Exception as e:
                print(f"Error sending daily news: {e}")
                
    # scheduler.add_job(func=send_daily_news, trigger="interval", hours=24)
    scheduler.add_job(func=send_daily_news, trigger="interval", seconds=10)
    
    # Start the scheduler
    scheduler.start()

    # Create the database tables
    with app.app_context():
        db.create_all()

    
    return app
