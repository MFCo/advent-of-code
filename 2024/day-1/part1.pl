#!/usr/bin/perl
use strict;
use warnings;

my @left_column;
my @right_column;

open(my $fh, '<', 'input.txt') or die "WARUM?";

while (my $line = <$fh>) {
    chomp $line;
    my ($left, $right) = split(/\s+/, $line);
    push @left_column, $left;
    push @right_column, $right;
}
close $fh;

my @sorted_left = sort { $a <=> $b } @left_column;
my @sorted_right = sort { $a <=> $b } @right_column;

my $total = 0;
for my $i (0 .. $#sorted_left) {
    $total += abs($sorted_left[$i] - $sorted_right[$i]);
}

print "$total\n";
