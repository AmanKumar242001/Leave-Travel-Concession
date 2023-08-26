from random import randint
import requests
from env import OTP_URL, REMINDER_URL

env = {}
def randomGen(n):
    return ''.join([str(randint(0, 9)) for i in range(0, n)])


def sendOTP(email, otp):
    url = OTP_URL
    print(url)
    formdata = {
        "email": email,
        "body": otp
    }
    response = requests.post(url, data=formdata)
    response.raise_for_status()
    print(f"OTP: {otp} is sent to {email}")


def remindStakeholder(json):
    url = REMINDER_URL
    response = requests.post(url, data=json)
    print(response.content)
    response.raise_for_status()
    