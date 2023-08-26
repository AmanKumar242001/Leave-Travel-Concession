from models import User, LTCInfo, db, Notification, Receipt, Role
from flask import request
import uuid, mimetypes, json, os
from helper import remindStakeholder
from datetime import datetime
def checkEmail(emailId):
    foundUser = User.query.filter(User.emailId == emailId).first()
    return foundUser

def createNewLTCApplication(userInfo, formInfo):
    formInfo['userId'] = userInfo.id
    info = LTCInfo(formInfo)
    for file in request.files.getlist('file'):
        fileName = uuid.uuid4().hex + mimetypes.guess_extension(file.mimetype)
        base_path = os.path.join(os.path.dirname(__file__), 'receipts')
        filePath = f"{base_path}/{fileName}"
        info.receipts.append(Receipt(filePath))
        print(file.save(filePath))

    db.session.add(info)
    db.session.commit()
    print("JSON LTCINFO", info.json())
    return info

def listLiveApplications(userInfo):
    liveLtc = filter(lambda ltc: ltc.stageCurrent != 0 and ltc.stageCurrent <= 100, User.query.filter(User.id==userInfo.id).first().ltcInfos)
    return list(liveLtc)

def listDoneLTCApplications(userInfo):
    liveLtc = filter(lambda ltc: ltc.stageCurrent == 100, User.query.filter(User.id==userInfo.id).first().ltcInfos)
    return list(liveLtc)

def listLiveTAApplications(userInfo):
    # add Stage current here
    liveTa = filter(lambda ta: ta.stageCurrent != 0 and ta.stageCurrent <= 100, User.query.filter(User.id==userInfo.id).first().taInfos)
    return list(liveTa)


def addNotification(userId, message):
    user = User.query.filter(User.id == userId).first()
    user.notifications.append(Notification(message))
    db.session.commit()


def sendReminders():
    a = [j for j in LTCInfo.query.filter(
        LTCInfo.stageCurrent != 0 and LTCInfo.stageCurrent < 100).all()]
    f = filter(lambda j: (datetime.now() - j.lastForwardDate).days > 3, a)
    forms = [{'firstName': x.user.firstName, 'lastName': x.user.lastName, 'delay': (
        datetime.now() - x.lastForwardDate).days, 'stageCurrent': x.stageCurrent, 'id': x.id} for x in f]

    for form in forms:
        role = Role.query.filter(
            Role.stageCurrent == form['stageCurrent']).first()
        emails = [user.emailId for user in User.query.filter(
            User.roleId == role.id)]
        for email in emails:
            form['email'] = email
            print(form)
            remindStakeholder(form)
