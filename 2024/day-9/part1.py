def expand_blocks(disk_map):
    blocks = []
    file_id = 0
    is_file = True
    for char in disk_map:
        length = int(char)
        for _ in range(length):
            blocks.append(file_id if is_file else None)
        if is_file:
            file_id += 1
        is_file = not is_file
    return blocks

def move_things_left(blocks):
    right_file = len(blocks) - 1
    while True:
        while right_file >= 0 and blocks[right_file] is None:
            right_file -= 1
        if right_file < 0:
            break
        left_space = 0
        while left_space < len(blocks) and blocks[left_space] is not None:
            left_space += 1
        if left_space >= right_file:
            break
        blocks[left_space] = blocks[right_file]
        blocks[right_file] = None
    return blocks

def calculate_checksum(blocks):
    checksum = 0
    for pos, file_id in enumerate(blocks):
        if file_id is not None:
            checksum += pos * file_id
    return checksum

try:
    with open('input.txt', 'r') as file:
        disk_map = ''.join(file.read().split())
    print(calculate_checksum(move_things_left(expand_blocks(disk_map))))
except FileNotFoundError:
    print("WARUM?")
