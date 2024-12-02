
#!/usr/bin/perl
use strict;
use warnings;

open(my $fh, '<', 'input.txt') or die "WARUM?";

my $safe_reads = 0;

sub is_safe_levels {
    my @levels_to_check = @_;
    return 0 if scalar(@levels_to_check) < 2;

    my $is_increasing = $levels_to_check[1] > $levels_to_check[0];
    for (my $i = 0; $i < scalar(@levels_to_check) - 1; $i++) {
        my $diff = abs($levels_to_check[$i] - $levels_to_check[$i + 1]);
        return 0 if $diff > 3;
        return 0 if $is_increasing && $levels_to_check[$i] >= $levels_to_check[$i + 1];
        return 0 if !$is_increasing && $levels_to_check[$i] <= $levels_to_check[$i + 1];
    }
    return 1;
}

while (my $line = <$fh>) {
    chomp $line;
    my @levels = split(/\s+/, $line);
    next if scalar(@levels) < 2;

    my $is_safe = 0;
    if (is_safe_levels(@levels)) {
        $is_safe = 1;
    } else {
        for (my $i = 0; $i < scalar(@levels); $i++) {
            my @temp_levels = @levels;
            splice(@temp_levels, $i, 1);
            if (is_safe_levels(@temp_levels)) {
                $is_safe = 1;
                last;
            }
        }
    }

    $safe_reads++ if $is_safe;
}

close($fh);

print "$safe_reads\n";
