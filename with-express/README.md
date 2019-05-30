Decimal Calculator. What particularly interests me is the reciprocal of a prime number--other than 2 and 5. The decimal expansion of such a reciprocal consists of an infinitely repeating period of a length less than the denominator. For example, for the prime number 7, the period of the reciprocal is 142857. Note that the length is 6.

The period length can be an odd or an even number. If it's even, the period can be split in half, and the sum of the two halves will be a series of 9s. (Notice how that applies to the period of 1/7.)

Let p be the prime number used for the denominator. Then the decimal expansion of 1/p is the period, repeated infinitely. What about (p-1)/p? The decimal expansion would, of course, be 1 - the expansion of 1/p. A simple way to think about this subtraction is to use a series of 9s after the decimal, rather than a 1 followed by 0s after the decimal. Continuing with 1/7 as an example, 1 - 1/7 = .999999 - .142857 = .857142 = 6/7.

Notice that a) the decimal period for 6/7 uses the same digits, in the same order, and b) the beginning of the period for 6/7 starts exactly at the halfway point of the period for 1/7.

The period length is n, where 10^n - 1 is p * the period. For 1/7, the period length is 6: 10^6 - 1 = 7 * 142857, or 999999. In general, the period length is n, where n is the minimum value such that 10^n - 1 is divisible by p without remainder.

When n is even, it is guaranteed that the first half of the period plus the second half will equal a number consisting of all 9s.
10^n - 1 = (10^x + 1) * (10^x - 1), where x = n/2.
Since, however, 10^n - 1 is the smallest value that p will divide, p cannot divide 10^x - 1. Therefore, p must divide 10^x + 1.
This means that 10^x is (p-1) mod p, which means that the first half of the period is 1 * 10^x / p, while the second half is (p-1) * 10^x / p.
