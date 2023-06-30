Input = [2, 7, 11, 15]
target = 9
n = len(Input)

for i in range(0, n):
  found = False
  for j in range(i, n):
    if Input[i] + Input[j] == target:
      print([i, j])
      found = True
      break
  if found:
    break