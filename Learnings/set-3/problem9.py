def divide(num1, num2):
  try:
    result = num1 / num2
    print(result)
  except ZeroDivisionError:
    print(ZeroDivisionError)


divide(5, 5)
