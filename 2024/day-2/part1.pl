#!/usr/bin/perl
use strict;
use warnings;


open(my $fh, '<', 'input.txt') or die "WARUM?";

my $safe_reads = 0;

while (my $line = <$fh>) {
    chomp $line;

    my @levels = split(/\s+/, $line);
    next if scalar(@levels) < 2;

    my $is_safe = 1;
    my $is_increasing = $levels[1] > $levels[0];

    for (my $i = 0; $i < scalar(@levels) - 1; $i++) {
        my $diff = abs($levels[$i] - $levels[$i + 1]);
        if ($diff > 3) {
            $is_safe = 0;
            last;
        }

        if ($is_increasing && $levels[$i] >= $levels[$i + 1]) {
            $is_safe = 0;
            last;
        }
        if (!$is_increasing && $levels[$i] <= $levels[$i + 1]) {
            $is_safe = 0;
            last;
        }
    }

    $safe_reads++ if $is_safe;
}

close($fh);

print "$safe_reads\n";
