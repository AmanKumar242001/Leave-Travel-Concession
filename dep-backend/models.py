from flask_sqlalchemy import SQLAlchemy
from typing import List, Optional
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, DateTime, Integer, func, CheckConstraint, or_
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    firstName: Mapped[str]
    lastName: Mapped[str]
    emailId: Mapped[str]
    hometown: Mapped[str]
    designation: Mapped[str] # assitant/ associate, junior superindendent
    payLevel: Mapped[int]
    roleId: Mapped[int] = mapped_column(ForeignKey('roles.id'))
    role: Mapped["Role"] = relationship(backref="users")
    dateOfJoining: Mapped[datetime]
    # isApplicant: Mapped[bool]
    signUrl: Mapped[Optional[str]]
    department: Mapped[str]
    ltcInfos: Mapped[List["LTCInfo"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    notifications: Mapped[List["Notification"]] = relationship(cascade="all, delete-orphan")

    def __init__(self, json):
        self.firstName = json['firstName']
        self.lastName = json['lastName']
        self.emailId = json['emailId']
        self.hometown = json['hometown']
        self.dateOfJoining = datetime.strptime(json['dateOfJoining'], '%Y-%m-%d')
        self.department = json['department']
        self.designation = json['designation']
        self.payLevel = json['payLevel']
        # self.isApplicant = json['isApplicant']
        self.roleId = json['roleId']
        self.ltcInfos = []

    def __repr__(self):
        return "User{id: %s, name: %s, emailId: %s, dateOfJoining: %s}" % (
                self.id,
                self.firstName,
                self.emailId,
                self.dateOfJoining,
                )
    
    def json(self):
        return {
                "id": self.id,
                "firstName": self.firstName,
                "lastName": self.lastName,
                "emailId": self.emailId,
                "hometown": self.hometown,
                # "dateOfJoining": self.dateOfJoining,
                "dateOfJoining": self.dateOfJoining,
                "department": self.department,
                # "isApplicant": self.isApplicant,
                "roleId": self.roleId,
                "designation": self.designation,
                "paylevel": self.payLevel,
                "role": self.role.json()
                }


class PersonInvolvedLTC(db.Model):
    __tablename__ = "people_involved_ltc"
    id: Mapped[int] = mapped_column(primary_key=True)
    ltcId: Mapped[int] = mapped_column(ForeignKey(('ltc_infos.id')))
    # LTCId -> foreign key
    name: Mapped[str]
    back: Mapped[bool]
    age: Mapped[int]
    relation: Mapped[str]
    fromPlace: Mapped[str]
    toPlace: Mapped[str]
    modeOfTravel: Mapped[str]
    
    def json(self):
        return {
            "id": self.id,
            "ltcId": self.ltcId,
            "name": self.name,
            "back": self.back,
            "age": self.age,
            "relation": self.relation,
            "fromPlace": self.fromPlace,
            "toPlace": self.toPlace,
            "modeOfTravel": self.modeOfTravel,
            }


class Role(db.Model):
    __tablename__ = "roles"
    id: Mapped[int] = mapped_column(primary_key=True)
    roleName: Mapped[str] 
    stageCurrent: Mapped[int]
    nextStage: Mapped[int]
    prevStage: Mapped[int] = mapped_column(nullable=True)

    def __repr__(self):
        return "Role {id: %s, roleName: %s, stageCurrent: %s, nextStage: %s, prevStage: %s}" % (
                self.id,
                self.roleName,
                self.stageCurrent,
                self.nextStage,
                self.prevStage,
                )

    def json(self):
        return {
                "id": self.id,
                "roleName": self.roleName,
                "stageCurrent": self.stageCurrent,
                "nextStage": self.nextStage,
                "prevStage": self.prevStage
            }




class LTCInfo(db.Model):
    __tablename__ = "ltc_infos"
    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey('users.id'))
    user: Mapped["User"] = relationship(back_populates="ltcInfos")
    fromDate: Mapped[datetime]
    toDate: Mapped[datetime]
    prefixFrom: Mapped[datetime] = mapped_column(nullable=True)
    prefixTo: Mapped[datetime] = mapped_column(nullable=True)
    suffixFrom: Mapped[datetime] = mapped_column(nullable=True)
    suffixTo: Mapped[datetime] = mapped_column(nullable=True)
    # spouseEntitiled -> bool
    # spouseEntitledProof -> filepath
    earnedLeaveAvailed: Mapped[int]
    natureOfTravel: Mapped[str]
    placeToVisit: Mapped[str]
    totalEstimatedFare: Mapped[int]
    # peopleInvolvedinLTC  -> foreign key
    advanceRequired: Mapped[bool]
    encashmentAvailed: Mapped[bool]
    encashmentNoOfDays: Mapped[int]
    stageRedirect: Mapped[int] = mapped_column(nullable=True)
    stageCurrent: Mapped[int]
    fillDate: Mapped[datetime]
    hodDate: Mapped[datetime]= mapped_column(nullable=True)
    estabDate: Mapped[datetime]= mapped_column(nullable=True)
    accountsDate: Mapped[datetime]= mapped_column(nullable=True)
    auditDate: Mapped[datetime]= mapped_column(nullable=True)
    registrarDate: Mapped[datetime]= mapped_column(nullable=True)
    deanDate: Mapped[datetime]= mapped_column(nullable=True)
    peopleInvolved: Mapped[List["PersonInvolvedLTC"]] = relationship(backref='ltc_infos', cascade="all, delete-orphan")
    comments: Mapped[List["Comment"]] = relationship(backref="ltc_infos", cascade='all, delete-orphan')
    receipts: Mapped[List["Receipt"]] = relationship(cascade="all, delete-orphan") 
    lastForwardDate: Mapped[datetime]= mapped_column(nullable=True)
    expectedJourneyDetails: Mapped[List["ExpectedJourneyDetail"]] = relationship(cascade="all, delete-orphan")

    def __init__(self, json):
        peopleInvolvedinLTC = json.get('peopleInvolved', [])
        dateLog = json.get('dateLog', [])
        for person in peopleInvolvedinLTC:
            p = PersonInvolvedLTC(**person)
            self.peopleInvolved.append(PersonInvolvedLTC(**person))

        self.userId = json['userId']
        if json['fromDate'] != '':
            self.fromDate = datetime.strptime(json['fromDate'], '%Y-%m-%d')
        else:
            self.fromDate = None
        if json['toDate'] != '':
            self.toDate = datetime.strptime(json['toDate'], '%Y-%m-%d')
        else:
            self.toDate = None
        if json['prefixFrom'] != '':
            self.prefixFrom = datetime.strptime(json['prefixFrom'], '%Y-%m-%d')
        else:
            self.prefixFrom = None
        if json['prefixTo'] != '':
            self.prefixTo = datetime.strptime(json['prefixTo'], '%Y-%m-%d')
        else:
            self.prefixTo = None
        if json['suffixFrom'] != '':
            self.suffixFrom = datetime.strptime(json['suffixFrom'], '%Y-%m-%d')
        else:
            self.suffixFrom = None
        if json['suffixTo'] != '':
            self.suffixTo = datetime.strptime(json['suffixTo'], '%Y-%m-%d')
        else:
            self.suffixTo = None

        self.earnedLeaveAvailed = json['earnedLeaveAvailed']
        self.natureOfTravel = json['natureOfTravel']
        self.placeToVisit = json['placeToVisit']
        self.totalEstimatedFare = json['totalEstimatedFare']
        self.advanceRequired = json['advanceRequired'] == 'on'
        self.encashmentAvailed = json['encashmentAvailed'] == 'on'
        self.encashmentNoOfDays = json['encashmentNoOfDays']
        # self.stageRedirect = json.get('stageRedirect')
        # self.stageCurrent = json['stageCurrent']
        self.fillDate = datetime.now()
        self.stageRedirect = None
        self.stageCurrent = 1
        self.lastForwardDate = datetime.now()

    def __repr__(self):
        return "LTCInfo(id=%s, )" % (
                self.id
                )
    
    def json(self):
         return {
                "id": self.id,
                "user": self.user.json(),
                "userId": self.userId,
                "fromDate": self.fromDate,
                "toDate": self.toDate,
                "prefixFrom": self.prefixFrom,
                "prefixTo": self.prefixTo,
                "suffixFrom": self.suffixFrom,
                "suffixTo": self.suffixTo,
                "earnedLeaveAvailed": self.earnedLeaveAvailed,
                "natureOfTravel": self.natureOfTravel,
                "placeToVisit": self.placeToVisit,
                "totalEstimatedFare": self.totalEstimatedFare,
                "advanceRequired": self.advanceRequired,
                "encashmentAvailed": self.encashmentAvailed,
                "encashmentNoOfDays": self.encashmentNoOfDays,
                "stageRedirect": self.stageRedirect,
                "stageCurrent": self.stageCurrent,
                "fillDate": self.fillDate,
                "hodDate": self.hodDate,
                "estabDate": self.estabDate,
                "accountsDate": self.accountsDate,
                "auditDate": self.auditDate,
                "registrarDate": self.registrarDate,
                "deanDate": self.deanDate,
                "peopleInvolved": [person.json() for person in self.peopleInvolved],
                "lastForwardDate": self.lastForwardDate,
                "expectedJourneyDetails": [det.json() for det in self.expectedJourneyDetails],
                "receipts": [r.id for r in self.receipts],
                }

class Comment(db.Model):
    __tablename__ = "comments"
    id: Mapped[int] = mapped_column(primary_key=True)
    ltcId: Mapped[int] = mapped_column(ForeignKey(('ltc_infos.id')))
    comment: Mapped[str]
    handlerId: Mapped[int] = mapped_column(ForeignKey(('users.id')))
    handler: Mapped["User"] = relationship(backref="issued_comments")
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    
    def __repr__(self):
        return f"Comment('{self.comment}' set by {self.handler.designation})"

    def json(self):
        return {
                "id": self.id,
                "ltcId": self.ltcId,
                "comment": self.comment,
                "handler": self.handler.json(),
                "created_at": self.created_at,
                }




class TAInfo(db.Model):
    __tablename__ = "ta_infos"
    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey('users.id'))
    user: Mapped["User"] = relationship(backref="taInfos")
    ltcId: Mapped[int] = mapped_column(ForeignKey('ltc_infos.id'))
    ltcInfo: Mapped["LTCInfo"] = relationship(backref="taInfo")
    journeyDetails: Mapped[List["JourneyDetail"]] = relationship(backref="taInfo", cascade="all, delete-orphan") 
    comments: Mapped[List["CommentTA"]] = relationship(backref="ta_infos", cascade='all, delete-orphan')
    stageRedirect: Mapped[int] = mapped_column(nullable=True)
    stageCurrent: Mapped[int]
    fillDate: Mapped[Optional[datetime]]
    receipts: Mapped[List["Receipt"]] = relationship(cascade="all, delete-orphan") 
    lastForwardDate: Mapped[datetime]= mapped_column(nullable=True)
    
    # stageCurrent: Mapped[int]


    def __init__(self, userId, ltcId, journeyDetails):
        self.userId = userId
        self.ltcId = ltcId
        self.journeyDetails = [JourneyDetail(journeyDet) for journeyDet in journeyDetails]
        self.stageCurrent = 1
        self.fillDate = datetime.now()


    def json(self):
        return {
                "id": self.id,
                "user": self.user.json(),
                "ltcInfo": self.ltcInfo.json(),
                "journeyDetails": [journeyDet.json() for journeyDet in self.journeyDetails],
                "fillDate": self.fillDate,
                "stageCurrent": self.stageCurrent,
                "lastForwardDate": self.lastForwardDate,
                "receipts": [r.id for r in self.receipts],
                }

class JourneyDetail(db.Model):
    __tablename__ = "journey_details"
    id: Mapped[int] = mapped_column(primary_key=True)
    taId: Mapped[int] = mapped_column(ForeignKey('ta_infos.id'))
    departureDate: Mapped[datetime]
    departureFrom: Mapped[str]
    arrivalDate: Mapped[datetime]
    arrivalTo: Mapped[str]
    distance: Mapped[int]
    modeOfTravel: Mapped[str]
    classOfTravel: Mapped[str]
    noOfFares: Mapped[int]
    totalFare: Mapped[int]
    ticketNo: Mapped[str]

    def __init__(self, json):
        super().__init__(**json)
        self.departureDate = datetime.strptime(json['departureDate'], '%Y-%m-%d')
        self.arrivalDate = datetime.strptime(json['arrivalDate'], '%Y-%m-%d')

    def json(self):
        return {
                "id": self.id,
                "departureDate": self.departureDate,
                "departureFrom": self.departureFrom,
                "arrivalDate": self.arrivalDate,
                "arrivalTo": self.arrivalTo,
                "distance": self.distance,
                "modeOfTravel": self.modeOfTravel,
                "classOfTravel": self.classOfTravel,
                "noOfFares": self.noOfFares,
                "totalFare": self.totalFare,
                "ticketNo": self.ticketNo
                }
    # journeyDetails:[{
    #   departureDate:"2023-05-11",
    #   departureFrom:"Punjab",
    #   arrivalDate:"2023-05-13",
    #   arrivalTo:"Chandigarh",,
    #   distance:75,
    #   modeOfTravel:"Bus",
    #   classOfTravel:"A",
    #   noOfFares:4,
    #   totalFare:400,
    #   ticketNo:50,
    # }],

class ExpectedJourneyDetail(db.Model):
    __tablename__ = "expected_journey_details"
    id: Mapped[int] = mapped_column(primary_key=True)
    ltcId: Mapped[int] = mapped_column(ForeignKey('ltc_infos.id'))
    departureFrom: Mapped[str]
    arrivalTo: Mapped[str]
    modeOfTravel: Mapped[str]
    noOfFares: Mapped[int]
    singleFare: Mapped[int]

    def __init__(self, json):
        print("adding", json, "expected journey detail -- from models.py Line361")
        super().__init__(**json)

    def json(self):
        return {
                "id": self.id,
                "departureFrom": self.departureFrom,
                "arrivalTo": self.arrivalTo,
                "modeOfTravel": self.modeOfTravel,
                "noOfFares": self.noOfFares,
                "singleFare": self.singleFare,
                }


class CommentTA(db.Model):
    __tablename__ = "ta_comments"
    id: Mapped[int] = mapped_column(primary_key=True)
    taId: Mapped[int] = mapped_column(ForeignKey(('ta_infos.id')))
    comment: Mapped[str]
    handlerId: Mapped[int] = mapped_column(ForeignKey(('users.id')))
    handler: Mapped["User"] = relationship(backref="issued_ta_comments")
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    
    def __repr__(self):
        return f"Comment('{self.comment}' set by {self.handler.designation})"

    def json(self):
        return {
                "id": self.id,
                "taId": self.taId,
                "comment": self.comment,
                "handler": self.handler.json(),
                "created_at": self.created_at,
                }
    



class Notification(db.Model):
    __tablename__ = "notifications"
    id: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey('users.id'))
    time: Mapped[datetime]
    message: Mapped[str]

    def __init__(self, message):
        self.time = datetime.now()
        self.message = message

    def json(self):
        return {
            'time': self.time,
            'message': self.message,
        }
    

class Receipt(db.Model):
    __tablename__ = "receipts"
    id: Mapped[int] = mapped_column(primary_key=True)
    ltcFormId: Mapped[Optional[int]] = mapped_column(ForeignKey('ltc_infos.id'))
    taFormId: Mapped[Optional[int]] = mapped_column(ForeignKey('ta_infos.id'))
    filePath: Mapped[str]

    __table_args__ = (
        CheckConstraint(
            or_(ltcFormId.is_(None), taFormId.is_(None)),
            name='either_ltc_or_ta'
        ),
    )

    def __init__(self, filePath):
        self.filePath = filePath



