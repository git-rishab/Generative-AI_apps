file = "input.txt"
i = 0
with open(file, "r") as file:
  while True:
    char = file.read(1)  # Read one character at a time
    if not char:  # Check if end of file
      break
    i += 1

file2 = "output.txt"
with open(file2, "w") as file2:
  file2.write(f"Number of words: {i}")
