from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# problem 1

db = {
    'data':[]
}

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/greet/<username>')
def greet(username):
    return f"Hello, {username}"

@app.route('/farewell/<username>')
def farewell(username):
    return f"Goodbye, {username}!"

# problem 2

@app.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    db['data'].append(data)
    return jsonify({'ok':'true','message': 'Data uploaded successfully'})

@app.route('/read', methods=['GET'])
def read():
    return jsonify({'ok':'true','message': db['data']})

@app.route('/update/<id>', methods=['PATCH'])
def update(id):
    data = request.get_json()
    n = len(db['data'])
    for i in range(0,n) :
        if int(db['data'][i]['id']) == int(id) :
            db['data'][i] = data
            break

    return jsonify({'ok':'true','message': 'Data updated'})

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    n = len(db['data'])
    for i in range(0,n) :
        if int(db['data'][i]['id']) == int(id) :
            db['data'].pop(i)
            break

    return jsonify({'ok':'true','message': 'Data Deleted'})


if __name__ == '__main__':
    app.run(port=3000)
