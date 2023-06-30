import math
s1 = "Ault"
s2 = "Kelly"
mid = math.floor(len(s1)/2)
ans = ""
for i in range(0, len(s1)) :
  if i == mid :
    ans += s2
  else :
    ans += s1[i]
    
print(ans)