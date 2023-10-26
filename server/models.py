from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Define the association table
lead_type_lead_association = db.Table(
    'lead_type_lead_association',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('lead_id', db.Integer, db.ForeignKey('leads.id')),
    db.Column('lead_type_id', db.Integer, db.ForeignKey('types.id'))
)

class Type(db.Model, SerializerMixin):

    __tablename__ = "types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    serialize_rules = (
        "-leads",
    )

class Lead(db.Model, SerializerMixin):
    __tablename__ = "leads"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    notes = db.Column(db.Text)
    stage_id = db.Column(db.Integer, db.ForeignKey('stages.id'))

    stage = db.relationship('Stage', primaryjoin='Lead.stage_id == Stage.id', backref='associated_leads')
    lead_types = db.relationship(
        'Type',
        secondary=lead_type_lead_association,
        backref='associated_leads'  # This adds a back-reference to Type
    )

    @hybrid_property
    def lead_stage_name(self):
        return self.stage.name if self.stage else None

    serialize_rules = (
        "-stage",
        "-lead_types",
    )

    def __repr__(self):
        return f'Lead {self.name} ID {self.id}'

# Define the many-to-many relationship between Type and Lead outside of the class definitions
Type.leads = db.relationship(
    'Lead',
    secondary=lead_type_lead_association,
    primaryjoin=(lead_type_lead_association.c.lead_type_id == Type.id),
    secondaryjoin=(lead_type_lead_association.c.lead_id == Lead.id),
    backref=db.backref('associated_types', lazy='dynamic')
)

class Stage(db.Model, SerializerMixin):
    __tablename__ = "stages"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    leads = db.relationship('Lead', backref='stages', foreign_keys='Lead.stage_id')

    serialize_rules = (
        "-leads",
    )

    def __repr__(self):
        return self.name

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"

    @property
    def password_hash(self):
        raise AttributeError("Passwords cannot be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates('username', 'email')
    def validate_signup(self, key, value):
        if not len(value) > 0:
            raise ValueError("Must provide at least one character to sign up")
        return value
