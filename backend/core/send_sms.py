from twilio.rest import Client
from dotenv import load_dotenv
import os

PLIVO_AUTH_ID = os.environ.get("PLIVO_AUTH_ID", default="")
print("PLIVO_AUTH_ID: ", PLIVO_AUTH_ID)
PLIVO_AUTH_TOKEN = os.environ.get("PLIVO_AUTH_TOKEN", default="")
print("PLIVO_AUTH_TOKEN: ", PLIVO_AUTH_TOKEN)

# Your Account SID and Auth Token from console.twilio.com
account_sid = ""
auth_token  = ""

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+15558675309",
    from_="+254704817466",
    body="Hello from Python!")

print(message.sid)