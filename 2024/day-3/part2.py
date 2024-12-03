
import re

def process_line(text, counting):
    total = 0
    pattern = r'(mul\((\d+),(\d+)\)|do\(\)|don\'t\(\))'
    matches = re.finditer(pattern, text)
    for match in matches:
        instruction = match.group(1)
        if instruction == 'do()':
            counting = True
        elif instruction == "don't()":
            counting = False
        elif counting and instruction.startswith('mul'):
            num1 = int(match.group(2))
            num2 = int(match.group(3))
            total += num1 * num2
    return total, counting

try:
    total_sum = 0
    counting = True
    with open('input.txt', 'r') as file:
        for line in file:
            line_result, counting = process_line(line, counting)
            total_sum += line_result
    print(total_sum)
except FileNotFoundError:
    print("Error: WARUM?")
except Exception as e:
    print(f"An error occurred: {str(e)}")

