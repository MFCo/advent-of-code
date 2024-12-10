from collections import deque

def read_grid(filename):
    grid = []
    with open(filename, 'r') as f:
        for line in f:
            row = [int(c) for c in line.strip()]
            grid.append(row)
    return grid

def bfs(grid, start_x, start_y):
    rows, cols = len(grid), len(grid[0])
    visited = {}
    queue = deque([(start_x, start_y, 0, set())])
    visited[(start_x, start_y)] = 0
    trails = 0
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    while queue:
        curr_x, curr_y, trail_height, path = queue.popleft()
        if grid[curr_x][curr_y] == 9:
            trails += 1
            continue
        for dx, dy in directions:
            new_x, new_y = curr_x + dx, curr_y + dy
            if not (0 <= new_x < rows and 0 <= new_y < cols):
                continue
            curr_trail_height = grid[new_x][new_y]
            if curr_trail_height == trail_height + 1 and (new_x, new_y) not in path:
                new_path = path | {(curr_x, curr_y)}
                queue.append((new_x, new_y, curr_trail_height, new_path))
    return trails

def find_trails(grid):
    rows, cols = len(grid), len(grid[0])
    total_trails = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 0:
                trails = bfs(grid, i, j)
                total_trails += trails
    return total_trails

grid = read_grid('input.txt')
print(find_trails(grid))
