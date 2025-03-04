#!/usr/bin/env python3
from flask_restful import Resource, reqparse
from flask import current_app
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
                "lead_name": lead.name or None,
                "email": lead.email or None,
                "phone_number": lead.phone_number or None,
                "notes": lead.notes or None,
                "lead_type": lead.lead_type_name or None,
                "stage": lead.lead_stage_name or None,
                
            }
            for lead in leads
        ]

        return make_response(formatted_leads, 200)

api.add_resource(Leads, "/leads")

class LeadById(Resource):
    def get(self, lead_id):
        
        lead = Lead.query.get(lead_id)

        if lead is None:
            return {"error": "Lead not found"}, 404

        
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

      
        db.session.delete(lead)
        db.session.commit()

        return {"message": "Lead deleted successfully"}, 200
    
    def patch(self, lead_id):
        lead = Lead.query.get(lead_id)
        if lead is None:
            return {"error": "Lead not found"}, 404

        data = request.get_json()

        # Handle specific fields
        if 'lead_name' in data:
            setattr(lead, 'name', data['lead_name'])

        if 'email' in data:
            setattr(lead, 'email', data['email'])

        if 'phone_number' in data:
            setattr(lead, 'phone_number', data['phone_number'])

        if 'notes' in data:
            setattr(lead, 'notes', data['notes'])

        # Handle lead_type directly (assuming it's an integer)
        if 'lead_type' in data:
            setattr(lead, 'lead_type', data['lead_type'])

        # Handle stage directly (assuming it's an integer)
        if 'stage' in data:
            setattr(lead, 'stage_id', data['stage'])

        # Commit changes
        db.session.commit()

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
        stage_name = data.get("stage")
        if stage_name:
            stage = Stage.query.filter_by(name=stage_name).first()
            if stage:
                new_lead.stage = stage

        # Find the types by name
        lead_type = data.get("lead_type", None)
        if lead_type:
            lead_type_record = Type.query.filter_by(name=lead_type).first()
            if lead_type_record:
                new_lead.lead_types.append(lead_type_record)

        db.session.add(new_lead)
        db.session.commit()

        return {"message": "Lead added successfully"}, 201

api.add_resource(AddLead, "/leads")



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