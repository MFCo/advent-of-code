def read_puzzle(input):
    with open(input, 'r') as file:
        return [line.strip() for line in file]

PATTERNS = [
    [
        ['M', '.', 'S'],
        ['.', 'A', '.'],
        ['M', '.', 'S']
    ],
    [
        ['M', '.', 'M'],
        ['.', 'A', '.'],
        ['S', '.', 'S']
    ],
    [
        ['S', '.', 'M'],
        ['.', 'A', '.'],
        ['S', '.', 'M']
    ],
    [
        ['S', '.', 'S'],
        ['.', 'A', '.'],
        ['M', '.', 'M']
    ]
]

def match_pattern(puzzle_grid, pattern, row, col):
    for i in range(3):
        for j in range(3):
            if pattern[i][j] != '.':
                if row+i-1 < 0 or row+i-1 >= len(puzzle_grid) or col+j-1 < 0 or col+j-1 >= len(puzzle_grid[0]) or puzzle_grid[row+i-1][col+j-1] != pattern[i][j]:
                    return False
    return True

def count_patterns(puzzle_grid):
    count = 0
    
    for i in range(len(puzzle_grid)):
        for j in range(len(puzzle_grid[0])):
            for pattern in PATTERNS:
                if match_pattern(puzzle_grid, pattern, i, j):
                    count += 1
    
    return count

puzzle = read_puzzle('input.txt')
result = count_patterns(puzzle)
print(result)


