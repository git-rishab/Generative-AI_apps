from flask import Flask, jsonify, request
from re import match
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
import os


app = Flask(__name__)
CORS(app)
# app.config['SECRET_KEY'] = 'your-secret-key'
url = os.getenv('MONGO')

# socketio = SocketIO(app)

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

# Get menu
@app.route('/menu', methods=['GET'])
def get_menu():
    data = list(menu.find())
    # Convert ObjectId to string representation
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify({"ok":True, 'data':data})

# Add a Dish
@app.route('/add/dish', methods=['POST'])
def add_dish():
    new_item = request.json
    menu.insert_one(new_item)
    return jsonify({'ok':True, 'message':'Dish Added Successfully'}), 201

# Remove a dish by ID in params
@app.route('/remove/dish/<id>', methods=['DELETE'])
def remove_dish(id):
    menu.delete_one({"_id":ObjectId(id)})
    return jsonify({'ok':True, 'message':'Dish removed successfully'}), 200

# Update stock
@app.route('/update/stock', methods=['PATCH'])
def update_menu():
    quantity = int(request.args.get('quantity'))
    id = request.args.get('id')
    menu.update_one({"_id":ObjectId(id)}, {"$set":{"quantity":quantity}})
    return jsonify({'message': 'Item updated successfully'}), 200

# Take an order
@app.route('/order', methods=['POST'])
def order():
    new_item = request.get_json()    
    new_item['status'] = 'received'
    result = menu.update_one(
        {"_id":ObjectId(new_item['dish']), "quantity": {"$gte": new_item['quantity']}},
        {"$inc": {"quantity": -new_item['quantity']}}
    )
    if result.modified_count > 0:
        new_item['dish'] = ObjectId(new_item['dish'])
        orders.insert_one(new_item)
        return jsonify({'ok':True,'message': 'order placed successfully'}), 201
    else :
        return jsonify({'ok':False,'message': 'Order quantity is greater than stock available'}), 400

# Updating order status
@app.route('/order/status', methods=['PATCH'])
def update_order():
    id = request.args.get('id')
    status = request.args.get('status')
    if status == 'preparing' or status == 'ready for pickup' or status == 'delivered' :
        orders.update_one({"_id":ObjectId(id)}, {"$set": {"status":status}})
        return jsonify({'ok':True,'message': 'order status updated successfully'}), 200
    else :
        return jsonify({'ok':False, 'message':"status could only be preparing, ready for pickup or delivered"})

# all orders
@app.route('/orders', methods=['GET'])
def get_orders():
    data = list(orders.find())
    # Convert ObjectId to string representation
    for item in data:
        item['_id'] = str(item['_id'])
        item['dish'] = str(item['dish'])
    return jsonify({"ok":True, 'data':data})


if __name__ == '__main__':
    app.run(port=5000)
