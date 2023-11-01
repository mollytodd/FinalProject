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





# class Signup(Resource):
#     def post(self):
#         username = request.get_json()["username"]
#         email = request.get_json()["email"]
#         new_user = User(
#             username=username,
#             email=email,
#         )

#         password = request.get_json()["password"]
#         new_user.password_hash = password
#         db.session.add(new_user)
#         db.session.commit()
#         session["user_id"] = new_user.id

#         # return new_user.to_dict()
#         return new_user.to_dict()


# api.add_resource(Signup, "/signup")

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
    
    def delete(self, lead_id):
        lead = Lead.query.get(lead_id)

        if lead is None:
            return {"error": "Lead not found"}, 404

        # Remove the lead from the session
        db.session.delete(lead)
        db.session.commit()

        return {"message": "Lead deleted successfully"}, 200


api.add_resource(LeadById, "/leads/<int:lead_id>")

class AddLead(Resource):
    def post(self):
        data = request.get_json()
        # Create a new lead
        new_lead = Lead(
            name=data["lead_name"],  # Use "lead_name" instead of "name"
            email=data["email"],
            phone_number=data["phone_number"],
            notes=data["notes"],
        )

        # Find the stage by name
        stage_name = data.get("stage_name")
        if stage_name:
            stage = Stage.query.filter_by(name=stage_name).first()
            if stage:
                new_lead.stage = stage

        # Find the types by name
        type_names = data.get("type_names", [])
        for type_name in type_names:
            lead_type = Type.query.filter_by(name=type_name).first()
            if lead_type:
                new_lead.lead_types.append(lead_type)

        db.session.add(new_lead)
        db.session.commit()

        return {"message": "Lead added successfully"}, 201

api.add_resource(AddLead, "/leads")

class EditLead(Resource):
    def patch(self, lead_id):
        data = request.get_json()
        lead = Lead.query.get(lead_id)

        if lead is None:
            return {"error": "Lead not found"}, 404

        # Update lead information
        if "lead_name" in data:  # Use "lead_name" instead of "name"
            lead.name = data["lead_name"]
        if "email" in data:
            lead.email = data["email"]
        if "phone_number" in data:
            lead.phone_number = data["phone_number"]
        if "notes" in data:
            lead.notes = data["notes"]

        # Find the stage by name and update it
        stage_name = data.get("stage_name")
        if stage_name:
            stage = Stage.query.filter_by(name=stage_name).first()
            if stage:
                lead.stage = stage
            else:
                return {"error": "Stage not found"}, 404

        # Find the types by name and update them
        type_names = data.get("type_names", [])
        lead.lead_types.clear()
        for type_name in type_names:
            lead_type = Type.query.filter_by(name=type_name).first()
            if lead_type:
                lead.lead_types.append(lead_type)

        db.session.commit()

        return {"message": "Lead updated successfully"}, 200

api.add_resource(EditLead, "/leads/<int:lead_id>")


type_name_to_id = {
    "Google": 1,
    "Yelp": 2,
    "Referral": 3,
    "Instagram": 4,
    "Facebook": 5,
    "Cold Call": 6,
    "TikTok": 7,
    "Flyer": 8,
    "Walk By": 9,
    "Other": 10,
}

class LeadsByType(Resource):
    def get(self, lead_type_name):
        # Look up the type_id based on the lead type name
        type_id = type_name_to_id.get(lead_type_name)

        if type_id is None:
            return {"error": "Type not found"}, 404

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

api.add_resource(LeadsByType, "/leads/type/<string:lead_type_name>")

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

# class DeleteLead(Resource):
#     def delete(self, lead_id):
#         with db.session.begin():
#             lead = Lead.query.with_for_update().get(lead_id)

#             if lead is None:
#                 return {"error": "Lead not found"}, 404

#             db.session.delete(lead)

#         return {"message": "Lead deleted successfully"}, 200

# api.add_resource(DeleteLead, "/leads/<int:lead_id>")


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

