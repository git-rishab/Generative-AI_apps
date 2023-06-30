Input = [64, 25, 12, 22, 11]
n = len(Input)

for i in range(0, n - 1):
  min_index = i
  for j in range(i + 1, n):
    if Input[j] < Input[min_index]:
      min_index = j

  temp = Input[i]
  Input[i] = Input[min_index]
  Input[min_index] = temp

print(Input)
