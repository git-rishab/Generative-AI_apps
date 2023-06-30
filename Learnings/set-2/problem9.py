sample_dict = {"name": "Kelly", "age": 25, "salary": 8000, "city": "New york"}

# Keys to extract
keys = ["name", "salary"]

extracted = {}

for key in keys:
  extracted[key] = sample_dict[key]

print(extracted)
