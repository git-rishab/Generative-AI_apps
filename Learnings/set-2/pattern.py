# Print the pattern
# Write a program to print the following number pattern using a loop.
# 1
# 1 2
# 1 2 3
# 1 2 3 4
# 1 2 3 4 5

num = 5
temp = ""
for i in range(1,num+1) :
  temp += str(i) + " "
  print(temp)