from flask import Flask
from flask_cors import CORS
from routes.operations import get_menu, add_dish, remove_dish, update_menu, order, update_order, get_orders

app = Flask(__name__)
CORS(app)

app.route('/menu', methods=['GET'])(get_menu)
app.route('/add/dish', methods=['POST'])(add_dish)
app.route('/remove/dish/<id>', methods=['DELETE'])(remove_dish)
app.route('/update/stock', methods=['PATCH'])(update_menu)
app.route('/order', methods=['POST'])(order)
app.route('/order/status', methods=['PATCH'])(update_order)
app.route('/orders', methods=['GET'])(get_orders)

if __name__ == '__main__':
    app.run(port=5000)
