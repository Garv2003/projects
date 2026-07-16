import resend
from flask import current_app

def send_email(to, subject, body):
    resend.api_key = current_app.config['RESEND_API_KEY']
    print(f"Sending email to {to}")
    
    params: resend.Emails.SendParams = {
        "from": "Acme <onboarding@resend.dev>",
        "to": ["delivered@resend.dev"],
        "subject": subject,
        "html": body,
    }
    resend.Emails.send(params)
