string = "Python"

def reverse(str) : 
  temp = ""
  length = len(str);
  for i in range(length-1,-1,-1) :
    temp = temp + str[i]
  print("rervsersed: ",temp)

reverse(string)