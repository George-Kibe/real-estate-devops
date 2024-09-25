import plivo
from dotenv import load_dotenv
import os

#client = plivo.RestClient(auth_id='your_auth_id', auth_token='your_auth_token')

def send_sms(): #(phone_number, message):
    PLIVO_AUTH_ID = os.environ.get("PLIVO_AUTH_ID", default="")
    print("PLIVO_AUTH_ID: ", PLIVO_AUTH_ID)
    PLIVO_AUTH_TOKEN = os.environ.get("PLIVO_AUTH_TOKEN", default="")
    print("PLIVO_AUTH_TOKEN: ", PLIVO_AUTH_TOKEN)
    
    try:
        client = plivo.RestClient(auth_id=PLIVO_AUTH_ID, auth_token=PLIVO_AUTH_TOKEN)
        message_created = client.messages.create(
            src='+18884184991',
            #src='AptTracking',
            #dst='+254795288155',
            #dst='+254704817466',
            dst='+16234440615',
            text="This is just a test message"
        )
        print(message_created)
        
    except Exception as e:
        print("Error sending SMS: ", e)