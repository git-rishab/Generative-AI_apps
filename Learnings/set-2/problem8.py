employees = ['Kelly', 'Emma']
defaults = {"designation": 'Developer', "salary": 8000}

obj = {}

for employee in employees:
  obj[employee] = defaults

print(obj)
