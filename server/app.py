#!/usr/bin/env python3

from flask_cors import CORS
from flask import Flask
from flask import request, make_response, session, abort
from flask_restful import Resource
from models import *
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *




cors = CORS(app)


class Signup(Resource):
    def post(self):
        username = request.get_json()["username"]
        email = request.get_json()["email"]
        new_user = User(
            username=username,
            email=email,
        )

        password = request.get_json()["password"]
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        # return new_user.to_dict()
        return new_user.to_dict()


api.add_resource(Signup, "/signup")

class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()

        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(rules=("_password_hash",))

        return {"error": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user.to_dict(rules=("_password_hash",))
            # return user.to_dict(only=("username",))

        else:
            return {"message": "401: Not Authorized"}, 401


api.add_resource(CheckSession, "/check_session")


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "204: No Content"}, 204


api.add_resource(Logout, "/logout")


class Leads(Resource):
    def get (self):
        leads = Lead.query.all()

        formatted_leads = [
            {
                "lead_id": lead.id,
                "lead_name": lead.name,
                "email": lead.email,
                "phone_number": lead.phone_number,
                "notes": lead.notes,
                "lead_type": lead.lead_type_name,
                "stage": lead.lead_stage_name,
                
            }
            for lead in leads
        ]

        return make_response(formatted_leads, 200)

api.add_resource(Leads, "/leads")

class LeadById(Resource):
    def get(self, lead_id):
        # Retrieve the lead by its ID
        lead = Lead.query.get(lead_id)

        if lead is None:
            return {"error": "Lead not found"}, 404

        # Format the lead data
        formatted_lead = {
            "lead_id": lead.id,
            "lead_name": lead.name,
            "email": lead.email,
            "phone_number": lead.phone_number,
            "notes": lead.notes,
            "lead_type": lead.lead_type_name,
            "stage": lead.lead_stage_name,
        }

        return make_response(formatted_lead, 200)
    
api.add_resource(LeadById, "/leads/<int:lead_id>")

class LeadsByType(Resource):
    def get(self, type_id):
        # Retrieve the type by its ID
        lead_type = Type.query.get(type_id)

        if lead_type is None:
            return {"error": "Type not found"}, 404

        # Get the leads associated with the type
        leads = lead_type.associated_leads

        formatted_leads = [
            {
                "lead_id": lead.id,
                "lead_name": lead.name,
                "email": lead.email,
                "phone_number": lead.phone_number,
                "notes": lead.notes,
                "lead_type": lead.lead_type_name,
                "stage": lead.lead_stage_name,
            }
            for lead in leads
        ]

        return make_response(formatted_leads, 200)

api.add_resource(LeadsByType, "/leads/type/<int:type_id>")

class LeadsByStage(Resource):
    def get(self, stage_id):
        # Retrieve the stage by its ID
        lead_stage = Stage.query.get(stage_id)

        if lead_stage is None:
            return {"error": "Stage not found"}, 404

        # Get the leads associated with the stage
        leads = lead_stage.associated_leads

        formatted_leads = [
            {
                "lead_id": lead.id,
                "lead_name": lead.name,
                "email": lead.email,
                "phone_number": lead.phone_number,
                "notes": lead.notes,
                "lead_type": lead.lead_type_name,
                "stage": lead.lead_stage_name,
            }
            for lead in leads
        ]

        return make_response(formatted_leads, 200)

api.add_resource(LeadsByStage, "/leads/stage/<int:stage_id>")


class Users(Resource):
    def get(self):
        users = [
            user.to_dict(
                rules=(
                  
                    "-leads",
                    "-stages",
                    "-types",
                )
            )
            for user in User.query.all()
        ]
        return make_response(users, 200)


api.add_resource(Users, "/users")


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

