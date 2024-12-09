
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

def find_file_positions(blocks):
    file_positions = {}
    current_file = None
    start_pos = 0
    length = 0
    for pos, file_id in enumerate(blocks + [None]): #this should count the last one too, if you are reading this, I was missing the last one for a while, sad
        if file_id != current_file:
            if current_file is not None:
                file_positions[current_file] = (start_pos, length)
            current_file = file_id
            start_pos = pos
            length = 1
        else:
            length += 1
    return file_positions

def move_files_left(blocks):
    file_positions = find_file_positions(blocks)
    max_file_id = max(file_positions.keys())
    for file_id in range(max_file_id, -1, -1):
        start_pos, length = file_positions[file_id]
        current_free_start = 0
        current_free_length = 0
        best_free_start = None
        for pos, block in enumerate(blocks):
            if pos >= start_pos:
                break
            if block is None:
                if current_free_length == 0:
                    current_free_start = pos
                current_free_length += 1
            else:
                current_free_length = 0
                current_free_start = pos + 1
            if current_free_length == length:
                best_free_start = current_free_start
                break
        if best_free_start is not None:
            for i in range(length):
                blocks[best_free_start + i] = file_id
            for i in range(length):
                blocks[start_pos + i] = None
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
    print(calculate_checksum(move_files_left(expand_blocks(disk_map))))
except FileNotFoundError:
    print("WARUM?")
