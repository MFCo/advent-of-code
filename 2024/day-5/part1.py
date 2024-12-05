def process_file():
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
                if valid:
                    total += sequence[len(sequence) // 2]
    return total

total = process_file()
print(total)
