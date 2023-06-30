string = "Hello"

def count(str):
  vowels = ["a","e","i","o","u","A","E","I","O","U"]
  length = len(str);
  count = 0
  for i in range(0,length) : 
    if str[i] in vowels :
      count += 1

  print(count)
count(string)