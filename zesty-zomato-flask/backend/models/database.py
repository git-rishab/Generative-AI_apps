from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

url = os.getenv('MONGO')

# Set up MongoDB connection and collection
client = MongoClient(url)
# Create database named zomato if it doesn't exist already
db = client['zomato']
# Create collection named users if it doesn't exist already
users = db['users']
# Create collection named orders if it doesn't exist already
orders = db['orders']
# Create collection named menu if it doesn't exist already
menu = db['menu']
