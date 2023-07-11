import pytest
import json

from app import app
from app import weather_data

# defining fixture
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


# tests
def test_read(client):
    initial_length = len(weather_data)
    response = client.get("/")
    # parsing as json
    data = response.get_json()
    assert response.status_code == 200
    assert initial_length == len(data["msg"])


def test_create(client):
    initial_length = len(weather_data)
    payload = {"Mumbai": {
        "temperature": 10,
        "weather": "Rainy"}
    }
    response = client.post("/", json=payload)
    assert response.status_code == 200
    assert len(weather_data) == initial_length+1


def test_delete(client):
    initial_length = len(weather_data)
    response = client.delete("/Austin")
    assert response.status_code == 200
    assert len(weather_data) == initial_length-1