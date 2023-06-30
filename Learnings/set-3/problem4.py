string = "madam"
palindrome = False

temp = list(string)
temp.reverse()
str1 = "".join(temp)

palindrome = True if str1 == string else False
print(palindrome)