from flask import Flask, jsonify

weather_data = {
    'San Francisco': {'temperature': 14, 'weather': 'Cloudy'},
    'New York': {'temperature': 20, 'weather': 'Sunny'},
    'Los Angeles': {'temperature': 24, 'weather': 'Sunny'},
    'Seattle': {'temperature': 10, 'weather': 'Rainy'},
    'Austin': {'temperature': 32, 'weather': 'Hot'},
}

app = Flask(__name__)
@app.route("/")
def home_page():
    return jsonify({"message":"Welcome to weather application"})


@app.route("/weather/<string:city>")
def get_weather(city):
    if(weather_data[city]):
        return jsonify({"message":weather_data[city]}), 200
    else:
        return jsonify({"message":"City Not Found"}), 404

if __name__ == "__main__":
    app.run()