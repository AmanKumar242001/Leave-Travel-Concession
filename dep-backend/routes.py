import mimetypes
import uuid
import os
from flask import Blueprint, session, request, send_file
import json
from helper import sendOTP
import random
from protected_routes import router as protected_router
# from checkEmail import check
from functions import checkEmail
import threading
from helper import randomGen, sendOTP
from models import Receipt

router = Blueprint("router", __name__)
# router.register_blueprint(protected_router, url_prefix='/auth')
router.register_blueprint(protected_router)

@router.route('/getReceipt', methods=['POST'])
def getReceipt():
    fileId = request.form.get('fileId')
    print(fileId)
    if(fileId):
        receipt = Receipt.query.filter(Receipt.id == fileId).first()
        print(receipt)
        if(receipt):
            path = receipt.filePath
            return send_file(path, as_attachment=True)
    return "200"


@router.route("/info", methods=["GET"])
def info():
    return {'info': '19:54:20'}


@router.route("/login", methods=["POST"])
def login():
    print(session)
    print(request.form)
    if(request.is_json):
        emailId = json.loads(request.data).get('emailId')
    else:
        emailId = request.form.get('emailId', None)
    print('emailId is', emailId)
    if (emailId):
        userInfo = checkEmail(emailId)
        if (userInfo):
            otp = randomGen(4)
            session['otp'] = otp
            session['_email'] = emailId
            print(f'{otp} sent to {emailId}')
            # sendOTP(emailId, otp)
            threading.Thread(target=sendOTP, args=(emailId, otp)).start()
            # session['userInfo'] = userInfo
            return "200", 200
        return "User not found", 401
        # return getUserInfo() 
    else:
        "Email not received", 401

@router.route('/acceptOTP', methods=['POST'])
def acceptOTP():
    print(session)
    emailId = session.get('_email', None)
    otp = request.form.get('otp', None)
    if(emailId and otp):
        userInfo = checkEmail(emailId)
        otp_ = session['otp']
        uf = getUserInfo()
        print('uf: ', uf)
        if(otp_==otp): 
            session['userInfo'] = userInfo
            return getUserInfo() 
        return "Incorrect OTP", 401
    return "OTP not received", 401

@protected_router.route('/getUserInfo', methods=["POST", "GET"])
def getUserInfo():
    userInfo = session.get('userInfo')
    if(userInfo):
        return {
                "firstName": userInfo.firstName,
                "lastName": userInfo.lastName,
                "emailId": userInfo.emailId,
                "dateOfJoining": userInfo.dateOfJoining,
                "department": userInfo.department,
                "isApplicant": True if userInfo.roleId == 0 else False,
                "roleId": userInfo.roleId,
                "designation": userInfo.designation,
                "role": userInfo.role.json(),
                "payLevel": userInfo.payLevel,
                "hometown": userInfo.hometown
                }, 200
    
    return {}, 401



@protected_router.route('/getSignImage', methods=["POST"])
def getSignImage():
    fileName = session.get('userInfo').signUrl
    base_path = os.path.join(os.path.dirname(__file__), 'uploads')
    filePath = f"{base_path}/{fileName}"
    return send_file(filePath) 


@router.route('/uploadReceipt', methods=["POST"])
def uploadReceipt():
    for file in request.files.getlist('file'):
        fileName = uuid.uuid4().hex + mimetypes.guess_extension(file.mimetype)
        base_path = os.path.join(os.path.dirname(__file__), 'receipts')
        filePath = f"{base_path}/{fileName}"
        print(file.save(filePath))
    return "what"



@router.route("/loginOTP", methods=["POST"])
def loginOTP():
    print(request.form)
    if(request.is_json):
        emailId = json.loads(request.data).get('emailId')
    else:
        emailId = request.form.get('emailId', None)
    print('emailId is', emailId)
    if (emailId):
        otp: int  = randomGen(4)
        sendOTP(emailId, otp)
        session['otp'] = otp
        userInfo = checkEmail(emailId)
        if(userInfo):
            sendOTP(email=emailId, otp=otp)
            return "User Found", 200
        return "User Not Found", 401
