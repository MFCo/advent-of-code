use strict;
use warnings;

open(my $input, '<', 'input.txt') or die "oops";

my $id_acc = 0;
my $power_acc = 0;

while (my $line = <$input>) {
    chomp($line);
    my %color_max;
    my ($game_id) = $line =~ /Game (\d+)/;
    while ($line =~ /(\d+) (\w+)/g) {
        my $number = $1;
        my $color = $2;
        if (!exists $color_max{$color} || $number > $color_max{$color}) {
            $color_max{$color} = $number;
        }
    }
    if (!($color_max{'blue'} > 14 || $color_max{'red'} > 12 || $color_max{'green'} > 13)) {
        $id_acc += $game_id;
    }
    
    $power_acc += $color_max{'blue'} * $color_max{'red'} * $color_max{'green'};
}

print "Result id: $id_acc\n";
print "Result power: $power_acc\n"; 


close($input);