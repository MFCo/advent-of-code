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

my %right_counts;
foreach my $num (@right_column) {
    $right_counts{$num}++;
}

my $total = 0;
foreach my $left_num (@left_column) {
    if (exists $right_counts{$left_num}) {
        $total += $left_num * $right_counts{$left_num};
    }
}


print "$total\n";


