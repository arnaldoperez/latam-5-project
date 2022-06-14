import smtplib, ssl
from email.mime.text import MIMEText
import os

def sendMail(direccion,mensaje):
    GMAIL_KEY = os.getenv("GMAIL_APP_KEY")
    GMAIL_USER = os.getenv("GMAIL_APP_USER")
    to_addrs=[direccion]

    message=MIMEText(mensaje)
    message["Subject"]="Recuperacion de contraseña"
    message["To"]=to_addrs[0]
    message["From"]=GMAIL_USER + "@gmail.com"
    smtp_port=465
    smtp_address="smtp.gmail.com"
    context = ssl.create_default_context()
    print("Listo para enviar el correo:")
    with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:  
        #server.ehlo()
        print("Enviando correo....")
        server.login(GMAIL_USER, GMAIL_KEY)
        server.sendmail(from_addr, to_addrs, message)
        print("Correo enviado!")