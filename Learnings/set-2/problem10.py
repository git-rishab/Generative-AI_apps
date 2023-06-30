tuple1 = (11, [22, 33], 44, 55)

for el in tuple1:
  if type(el) == list:
    el[0] = 222
    break

print(tuple1)
