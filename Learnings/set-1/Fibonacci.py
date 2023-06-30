def fibonacci(n):
    sequence = [0, 1]  # Initial values of Fibonacci sequence

    # Generate Fibonacci sequence up to n numbers
    while len(sequence) < n:
        next_number = sequence[-1] + sequence[-2]
        sequence.append(next_number)

    return sequence[:n]

# Test the function
n = 5
fibonacci_sequence = fibonacci(n)
print(fibonacci_sequence)
