
def reorder_sequence(sequence, rules):
    changed = True
    # IS THIS BUBBLE SORT?
    while changed:
        changed = False
        for a, b in rules:
            try:
                pos_a = sequence.index(a)
                pos_b = sequence.index(b)
                if pos_b < pos_a:
                    sequence[pos_a], sequence[pos_b] = sequence[pos_b], sequence[pos_a]
                    changed = True
            except ValueError:
                continue
    
    return sequence

def get_my_result_pls():
    rules = []
    total = 0
    reading_rules = True
    
    with open('input.txt', 'r') as file:
        for line in file:
            line = line.strip()
            if line == "":
                reading_rules = False
                continue
            if reading_rules:
                a, b = map(int, line.split('|'))
                rules.append((a, b))
            else:
                sequence = list(map(int, line.split(',')))
                valid = True
                for a, b in rules:
                    try:
                        pos_a = sequence.index(a)
                        pos_b = sequence.index(b)
                        if pos_b < pos_a:
                            valid = False
                            break
                    except ValueError:
                        continue
                if not valid:
                    reordered = reorder_sequence(sequence, rules)
                    total += reordered[len(reordered) // 2]
    return total

print(get_my_result_pls())
