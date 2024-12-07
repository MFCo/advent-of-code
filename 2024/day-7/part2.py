def evaluate(numbers, operators):
    result = numbers[0]
    for i in range(len(operators)):
        if operators[i] == '+':
            result += numbers[i + 1]
        elif operators[i] == '*':
            result *= numbers[i + 1]
        else:
            result = int(str(result) + str(numbers[i + 1]))
    return result

def is_valid(potential_result, numbers):
    operators = ['+', '*', '||']
    for i in range(3 ** len(numbers) - 1):
        current_ops = []
        base_three_it = i
        for _ in range(len(numbers) - 1):
            current_ops.append(operators[base_three_it % 3])
            base_three_it //= 3
        if evaluate(numbers, current_ops) == potential_result:
            return True
    return False

def solve_calibration(equations):
    total = 0
    for line in equations:
        first_segment, second_segment = line.split(':')
        potential_result = int(first_segment.strip())
        numbers = [int(x) for x in second_segment.strip().split()]
        if is_valid(potential_result, numbers):
            total += potential_result
    return total

try:
    with open('input.txt', 'r') as file:
        input = file.readlines()
    print(solve_calibration(input))
except FileNotFoundError:
    print("WARUM?")
