
def find_guard(grid):
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '^':
                return i, j
    return -1, -1

def check_cycle(grid):
    rows, cols = len(grid), len(grid[0])
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]
    x, y = find_guard(grid)

    direction = 0  # Start facing up because puzzle input
    visited = set()
    while True:
        new_x = x + dx[direction]
        new_y = y + dy[direction]
        if not (0<= new_x < rows and 0 <= new_y < cols):
            return False
        if grid[new_x][new_y] == '#':
            direction = (direction +1) % 4
        else:
            x, y = new_x, new_y
            if (x, y, direction) in visited:
                return True
            visited.add((x, y, direction))
    return False

def count_cycle_possibilities(grid):
    rows = len(grid)
    cols = len(grid[0])
    count = 0
    # Yes, I'm brute forcing this
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '.':
                new_grid = [row[:] for row in grid]
                new_grid[i][j] = '#'
                if check_cycle(new_grid):
                    count += 1
    return count

try:
    with open('input.txt', 'r') as file:
        grid = [list(line.strip()) for line in file.readlines()]
    print(count_cycle_possibilities(grid))
except FileNotFoundError:
    print("WARUM?")
