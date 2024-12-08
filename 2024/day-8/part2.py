def get_all_antinodes_for_pair(antenna1, antenna2, width, height):
    x1, y1 = antenna1
    x2, y2 = antenna2
    dx = x2 - x1
    dy = y2 - y1
    antinodes = set()
    antinodes.add((x1, y1)) #antenas are also antinodes
    antinodes.add((x2, y2))
    current_x, current_y = x2 + dx, y2 + dy
    while 0 <= current_x < width and 0 <= current_y < height:
        antinodes.add((current_x, current_y))
        current_x += dx
        current_y += dy
    current_x, current_y = x1 - dx, y1 - dy
    while 0 <= current_x < width and 0 <= current_y < height:
        antinodes.add((current_x, current_y))
        current_x -= dx
        current_y -= dy
    return antinodes

def find_antinodes(grid):
    antennas = {}
    height = len(grid)
    width = len(grid[0])
    for y in range(height):
        for x in range(width):
            if grid[y][x] not in '.':
                freq = grid[y][x]
                if freq not in antennas:
                    antennas[freq] = []
                antennas[freq].append((x, y))
    all_antinodes = set()
    for freq, positions in antennas.items():
        for i in range(len(positions)):
            for j in range(i + 1, len(positions)):
                pair_antinodes = get_all_antinodes_for_pair(
                    positions[i], 
                    positions[j], 
                    width, 
                    height
                )
                all_antinodes.update(pair_antinodes)
    return len(all_antinodes)

def read_input(filename):
    with open(filename, 'r') as file:
        return [line.strip() for line in file]

try:
    grid = read_input('input.txt')
    print(find_antinodes(grid))
except FileNotFoundError:
    print("WARUM?")
