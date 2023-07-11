from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
import json
from routes.operations import (
    get_menu,
    add_dish,
    remove_dish,
    update_menu,
    order,
    update_order,
    get_orders,
)
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "your-secret-key"
socketio = SocketIO(app, cors_allowed_origins="*")

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

app.route("/menu", methods=["GET"])(get_menu)
app.route("/add/dish", methods=["POST"])(add_dish)
app.route("/remove/dish/<id>", methods=["DELETE"])(remove_dish)
app.route("/update/stock", methods=["PATCH"])(update_menu)
app.route("/order", methods=["POST"])(order)
app.route("/order/status", methods=["PATCH"])(update_order)
app.route("/orders", methods=["GET"])(get_orders)


@app.route("/chat", methods=["POST"])
@limiter.limit("10 per 5 minute", error_message='Rate limit exceeded')
def chat():
    message = request.json["message"]
    api_key = os.getenv("OPENAI_API_KEY")

    prompt = [
        {
            "role": "system",
            "content": "I want you to act as a ChatBOT for 'Zomato' like food application, Give proper formal replies and try to solve the queries as you think is good for you by keeping the track that you are a chatBot for a 'Zomato' like food application",
        },
        {"role": "user", "content": message},
    ]

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=prompt,
            api_key=api_key,
        )
        response = completion.choices[0].message.content
        return jsonify({"ok": True, "message": response})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@socketio.on("connect")
def handle_connect():
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


@socketio.on("user")
def handle_custom_event(data):
    body = {
        "message":data
    }
    # Handle the data and send a response back to the client if needed
    response = requests.post('https://tasty-bites.onrender.com/chat', json=body)
    dataa = response.json()
    
    socketio.emit('GPT', dataa['message'])


if __name__ == "__main__":
    app.run(port=5000)
