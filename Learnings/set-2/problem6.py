list1 = ["Hello ", "take "]
list2 = ["Dear", "Sir"]
n = len(list1)

ans = []

for i in range(0,n) : 
  for j in range(0,n) :
    ans.append(list1[i] + list2[j])

print(ans)