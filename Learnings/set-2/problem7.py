list1 = [10, 20, 30, 40]
list2 = [100, 200, 300, 400]

n = len(list1)
j = len(list2) - 1

for i in range(0, n):
  print(list1[i], list2[j])
  j -= 1
