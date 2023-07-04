from flask import Flask, jsonify, request
from re import match
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
menu = {
    1 :{
        'name':'Chicken Biryani',
        'price':220,
        'quantity':10
    },
    2 :{
        'name':'Chicken Chili',
        'price':180,
        'quantity':25
    },
    3 :{
        'name':'Chicken 65',
        'price':135,
        'quantity':8
    }
}
orders  = {
    1:{
        'name':'Rishab',
        'dishName':'Chicken Biryani',
        'price':180,
        'quantity':1,
        'status':'received',
        'dish':1
    }
}

# Get menu
@app.route('/menu', methods=['GET'])
def get_menu():
    data = []
    for key in menu :
        temp = menu[key].copy()
        temp['dish'] = key
        data.append(temp)
    return jsonify({"ok":True, 'data':data})

# Add a Dish
@app.route('/add/dish', methods=['POST'])
def add_dish():
    new_item = request.json
    item_id = max(menu.keys()) + 1
    menu[item_id] = new_item
    return jsonify({'ok':True, 'message':'Dish Added Successfully'}), 201

# Remove a dish by ID in params
@app.route('/remove/dish/<id>', methods=['DELETE'])
def remove_dish(id):
    print(id)
    if int(id) not in menu :
        return jsonify({'ok':False, 'message':'Invalid Dish ID'}), 400
    del menu[int(id)]
    return jsonify({'ok':True, 'message':'Dish removed successfully'}), 200

# Update stock
@app.route('/update/stock', methods=['PATCH'])
def update_menu():
    quantity = int(request.args.get('quantity'))
    id = int(request.args.get('id'))
    
    if int(id) in menu:
        menu[int(id)]['quantity'] = quantity
        return jsonify({'message': 'Item updated successfully'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404

# Take an order
@app.route('/order', methods=['POST'])
def order():
    new_item = request.get_json()
    print(new_item)
    if new_item['dish'] not in menu or 'name' not in new_item or 'quantity' not in new_item :
        return jsonify({'ok':False,'message': 'Please enter Data in correct format'}), 400
    elif not match(r'^\d+$', str(new_item['quantity'])) :
        return jsonify({'ok':False, 'message':'Quantity can be numbers only'})
    elif new_item['quantity'] > menu[new_item['dish']]['quantity'] :
        return jsonify({'ok':False, 'message':f"only {menu[new_item['dish']]['quantity']} pcs of {menu[new_item['dish']]['name']} is available"})
    
    new_item['status'] = 'received'
    item_id = max(orders.keys()) + 1
    orders[item_id] = new_item
    menu[new_item['dish']]['quantity'] -= new_item['quantity']
    return jsonify({'ok':True,'message': 'order placed successfully'}), 201

# Updating order status
@app.route('/order/status', methods=['PATCH'])
def update_order():
    id = int(request.args.get('id'))
    status = request.args.get('status')
    if status == 'preparing' or status == 'ready for pickup' or status == 'delivered' :
        if id not in orders :
            return jsonify({'ok':False, 'message':"Order doesn't exist"})
        orders[id]['status'] = status
        return jsonify({'ok':True,'message': 'order status updated successfully'}), 200
    else :
        return jsonify({'ok':False, 'message':"status could only be preparing, ready for pickup or delivered"})

# all orders
@app.route('/orders', methods=['GET'])
def get_orders():
    data = []
    for key in orders :
        temp = orders[key].copy()
        temp['id'] = key
        data.append(temp)
    return jsonify({"ok":True, 'data':data})

if __name__ == '__main__':
    app.run()
