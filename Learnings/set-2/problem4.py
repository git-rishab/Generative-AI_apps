str1 = "PyNaTive"
temp = sorted(str1, key=lambda x: (x.isupper(), x))
print("".join(temp))