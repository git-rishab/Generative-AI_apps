from flask import Flask, request, jsonify

weather_data = [
    {'San Francisco': {'temperature': 14, 'weather': 'Cloudy'}},
    {'New York': {'temperature': 20, 'weather': 'Sunny'}},
    {'Los Angeles': {'temperature': 24, 'weather': 'Sunny'}},
    {'Seattle': {'temperature': 10, 'weather': 'Rainy'}},
    {'Austin': {'temperature': 32, 'weather': 'Hot'}},
]

app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_data():
    return jsonify({"message": weather_data}), 200


@app.route("/", methods=["POST"])
def create():
    data = request.json
    weather_data.append(data)
    return jsonify("City Added Successfully"), 200


@app.route("/<string:city>", methods=["DELETE"])
def delete(city):
    print(city)
    for items in weather_data:
        if city in items:
            weather_data.remove(items)

    print(weather_data)

    return jsonify("City Deleted Successfully"), 200