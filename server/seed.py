#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
# Remote library imports
from faker import Faker
# Local imports
from app import app
from models import db
from config import db
from models import *
from faker import Faker
import random



# Create a Faker instance
fake = Faker()

# List of specific lead types
lead_type_names = ['Google', 'Yelp', 'Referral', 'Instagram', 'Facebook', 'Cold Call', 'TikTok', 'Flyer', 'Walk By', 'Other']

# List of specific lead stage names
lead_stage_names = ['Won', 'Lost', 'Qualifying', 'Negotiating', 'On Hold', 'Proposal', 'New Lead', 'Disqualified']

# Function to add users to the database with fake data
def add_users():
    users = []
    for _ in range(3):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        user.password_hash = 'password'
        users.append(user)
    db.session.add_all(users)

# Function to add lead stages to the database with fake data
def add_lead_stages():
    stages = []
    for stage_name in lead_stage_names:
        stage = Stage(
            name=stage_name
        )
        stages.append(stage)
    db.session.add_all(stages)

# Function to add lead types to the database
def add_lead_types():
    types = []
    for type_name in lead_type_names:
        lead_type = Type(name=type_name)
        types.append(lead_type)
    db.session.add_all(types)

# Function to add leads to the database with fake data and assign stage names
def add_leads():
    leads = []
    stages = Stage.query.all()  # Get all Stage instances
    types = Type.query.all()  # Get all Type instances
    for _ in range(300):
        stage = random.choice(stages)
        lead_type = random.choice(types)  # Select a random Type instance
        lead = Lead(
            name=f"{fake.first_name()} {fake.last_name()}",
            email=fake.email(),
            phone_number=fake.phone_number(),
            notes=fake.text(),
            stage_id=stage.id,
        )
        lead.lead_types.append(lead_type)  # Add the lead type
        leads.append(lead)
    db.session.add_all(leads)

# Main function to run the seed script
def seed_database():
    add_users()
    add_lead_stages()
    add_lead_types()
    add_leads()
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        db.create_all()
        print("Starting seed...")
        seed_database()