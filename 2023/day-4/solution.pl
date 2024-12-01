use strict;

open(my $input, '<', 'input.txt') or die "oops";

#my $acc = 0;
my %card_data;

my $cards = 0;

while (my $line = <$input>) {
    $cards ++;
    $line =~ s/Card\s+(\d+):\s+//;
    my $card_number = $1;

    if (!exists $card_data{$card_number}) {
        $card_data{$card_number}[1] = 1;
    }  
    else {
        $card_data{$card_number}[1] += 1;
    }

    for (my $j = 0; $j < $card_data{$card_number}[1]; $j++) {

        my ($group1, $group2) = split /\s+\|\s+/, $line;
        my @winners = split /\s+/, $group1;
        my @myNummies = split /\s+/, $group2;

        my %counts;
        foreach my $num (@winners, @myNummies) {
            $counts{$num}++;
        }
        my $points = 0;
        foreach my $num (keys %counts) {
            if ($counts{$num} > 1) {
                $points++;
            }
        }

##        if ($points >0) {
##            $acc = $acc + 2 ** ($points -1)
##        }

        $card_data{$card_number}[0] = $points;

        for (my $i = 1; $i <= $points; $i++) {
            if (!exists $card_data{$card_number + $i}) {
                $card_data{$card_number + $i}[1] = 1;
            }
            else {
                $card_data{$card_number + $i}[1] += 1;
            }
        }
    }
}

my $totalCards = 0;

foreach my $card_number (sort keys %card_data) {
    my ($points, $copies) = @{$card_data{$card_number}};
    $totalCards += $copies;
}

$totalCards += (scalar(%card_data) - $cards);

print "Part 2 result: $totalCards\n";

close($input);
