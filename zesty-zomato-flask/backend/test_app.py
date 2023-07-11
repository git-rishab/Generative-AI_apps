import pytest
import json
from app import app

def test_get_menu():
    client = app.test_client()
    response = client.get('/menu')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['ok'] == True
    assert 'data' in data
    assert isinstance(data['data'], list)

def test_add_dish():
    client = app.test_client()
    headers = {'Content-Type': 'application/json'}
    data = {
        'name': 'Pizza',
        'price': 150,
        'quantity':10
    }
    response = client.post('/add/dish', headers=headers, json=data)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['ok'] == True
    assert data['message'] == 'Dish Added Successfully'

def test_remove_dish():
    client = app.test_client()
    id = '64ad084ba62294d3541a855b'
    response = client.delete(f'/remove/dish/{id}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['message'] == 'Dish removed successfully'

def test_update_menu():
    client = app.test_client()
    id = '64ad05bed13312f5e6a5ecdf'
    quantity = 20
    response = client.patch(f"/update/stock?quantity={quantity}&id={id}")

    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['message'] == 'Item updated successfully'

def test_order():
    client = app.test_client()
    headers = {'Content-Type': 'application/json'}
    data = {
        "name": "Rishab",
        "dishName": "Chicken Biryani",
        "price": 180,
        "quantity": 1,
        "status": "received",
        "dish": "64a6dd7510490d95f530c339"
    }
    response = client.post('/order', headers=headers, json=data)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['ok'] == True
    assert data['message'] == 'order placed successfully'

def test_update_order():
    client = app.test_client()
    id = '64a6dfee10490d95f530c33a'
    status = 'ready for pickup'
    response = client.patch(f'/order/status?id={id}&status={status}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['ok'] == True
    assert data['message'] == 'order status updated successfully'

def test_get_orders():
    client = app.test_client()
    response = client.get('/orders')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['ok'] == True
    assert 'data' in data
    assert isinstance(data['data'], list)
