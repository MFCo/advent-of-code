def read_puzzle(input):
    with open(input, 'r') as file:
        return [line.strip() for line in file]

def is_valid_position(x, y, rows, cols):
    return 0 <= x < rows and 0 <= y < cols

def count_xmas(puzzle_grid):
    rows = len(puzzle_grid)
    cols = len(puzzle_grid[0])
    count = 0
    
    directions = [
        (0, 1),   # right
        (1, 1),   # right-down
        (1, 0),   # down
        (1, -1),  # left-down
        (0, -1),  # left
        (-1, -1), # left-up
        (-1, 0),  # up
        (-1, 1)   # right-up
    ]
    def check_word_from_position(x, y):
        local_count = 0
        word = "XMAS"
        for dx, dy in directions:
            current_x, current_y = x, y
            found = True
            for char in word:
                if not is_valid_position(current_x, current_y, rows, cols) or puzzle_grid[current_x][current_y] != char:
                    found = False
                    break
                current_x += dx
                current_y += dy
            if found:
                local_count += 1
        return local_count

    for i in range(rows):
        for j in range(cols):
            if puzzle_grid[i][j] == 'X':
                count += check_word_from_position(i, j)
    
    return count

puzzle = read_puzzle('input.txt')
result = count_xmas(puzzle)
print(result)

