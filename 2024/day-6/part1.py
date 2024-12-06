def find_guard(grid):
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '^':
                return i, j
    return -1, -1

def count_steps(grid):
    rows, cols = len(grid), len(grid[0])
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]
    x, y = find_guard(grid)

    direction = 0  # Start facing up because puzzle input
    visited = {(x, y)}
    while True:
        new_x = x + dx[direction]
        new_y = y + dy[direction]
        if not 0<= new_x < rows and 0 <= new_y < cols:
            break
        if grid[new_x][new_y] == '#':
            direction = (direction +1) % 4
        else:
            x, y = new_x, new_y
            visited.add((x, y))
    return len(visited)

try:
    with open('input.txt', 'r') as file:
        grid = [list(line.strip()) for line in file.readlines()]
    print(count_steps(grid))
except FileNotFoundError:
    print("Error: input.txt file not found")
