number = 14
prime = True

for num in range(2,number) :
  if number % num == 0 :
    prime = False
    break

print(prime)