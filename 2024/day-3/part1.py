import re

def process_multiplications(text):
    pattern = r'mul[\(](\d+),(\d+)[\)]'
    matches = re.finditer(pattern, text)
    total = 0
    for match in matches:
        num1 = int(match.group(1))
        num2 = int(match.group(2))
        total += num1 * num2
    
    return total

try:
    total_sum = 0
    with open('input.txt', 'r') as file:
        for line in file:
            line_result = process_multiplications(line)
            total_sum += line_result
    print(total_sum)
except FileNotFoundError:
    print("Error: WARUM?")
except Exception as e:
    print(f"An error occurred: {str(e)}")
