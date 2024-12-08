def get_antinodes_for_pair(antenna1, antenna2):
    x1, y1 = antenna1
    x2, y2 = antenna2
    dx = x2 - x1
    dy = y2 - y1
    return [(x2 + dx, y2 + dy), (x1 - dx, y1 - dy)]

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
    antinodes = set()
    for freq, positions in antennas.items():
        for i in range(len(positions)):
            for j in range(i + 1, len(positions)):
                potential_antinodes = get_antinodes_for_pair(positions[i], positions[j])
                for ax, ay in potential_antinodes:
                    if 0 <= ax < width and 0 <= ay < height:
                        antinodes.add((ax, ay))

    return len(antinodes)

def read_input(filename):
    with open(filename, 'r') as file:
        return [line.strip() for line in file]

try:
    grid = read_input('input.txt')
    print(find_antinodes(grid))
except FileNotFoundError:
    print("WARUM?")

