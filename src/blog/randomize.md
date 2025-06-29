---
title: "Using Discrete Logarithms to Randomize a Million Integers"
description: "Using Discrete Logarithms to Randomize a Million Integers"
date: "2025-04-08"
hasMath: true
---

# Using Discrete Logarithms to Randomize a Million Integers

For simplicity’s sake, my use of “numbers” here will mean positive integers (counting, or natural numbers).

On a recent project, I assigned myself a fun-sounding ticket for generating unique, pseudorandom 6 digit codes from a web server. A naive approach to accomplish that is to generate a random number on the fly, and compare it against previous codes to make sure it was unique, and regenerate if the number collides with a previous one… which becomes more necessary as more codes are generated. Another approach is to shuffle an array of sequential numbers up to a million, and write the shuffled values, one per row, into a database table or queue, and read them off in the order they were added.

I didn’t want to create a million row table, or have performance degrade over time, but I did want a solution that would create a sequence that didn’t have any obvious patterns in it, so that numbers aren’t guessable. I went with a more mathy solution that fit all the requirements. It needs only a prime number less than a million, finding a matching “generator” number that produces a shuffled set of all the numbers less than the prime, and tracking a sequence number somehow. Let’s explore how that works.

## Repeating numbers

You can create a repeating set of numbers by raising a starting number, the generator, to increasing powers, and taking the remainder after dividing by a prime number. If our generator is 3 and our prime is 7, this happens:

```pry
[1] pry(main)> (1..6).map { |n| 3 ** n % 7 }
=> [3, 2, 6, 4, 5, 1]
```

Because we’re taking the remainder mod 7 (the `% 7` at the end, which divides by 7 and returns the remainder), we end up with only values less than 7. Using 3 as a generator, our set of 6 values ends up being a shuffle of all the numbers between 1 and 6. Modular arithmetic lends us some terminology to describe what we’re looking at. The “multiplicative order”, or just “order” of this set is 6, the number of unique entries in it. Because the set generates all of the values less than 7, with no duplicates, the 3 generator is a “primitive root” of 7.

This makes more sense if you see what happens next in the sequence:

```pry
[2] pry(main)> (1..12).map { |n| 3 ** n % 7 }
=> [3, 2, 6, 4, 5, 1, 3, 2, 6, 4, 5, 1]
```

The sequence repeats every 6 numbers. Now, contrast that with a generator which isn’t a primitive root of 7. For example, 4:

```pry
[3] pry(main)> (1..6).map { |n| 4 ** n % 7 }
=> [4, 2, 1, 4, 2, 1]
```

The result of raising 4 to successive powers, mod 7, is a set that repeats every 3 numbers, so its order is 3. Group theory also lends us a term to descibe these sets: [finite cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group), which have a property that will be very interesting to us later: predictable subgroups.

## Scaling up

My goal is to take a prime near a million, (we’ll use 999983 in this example), and find a primitive root for it. So how does one do that?

The naive solution to see if a number is a primitive root is to generate all 999982 values and check for duplicates. A slightly easier method would be to search for 1’s in the sequence. Notice that our sets have all ended with 1, and the generator that wasn’t a primitive root had 1 appear earlier in the list as well.

Do all cyclic groups have 1 as the last digit? Yes, based on an identity from modular arithmetic, namely Fermat’s Little Theorem. It states that for any prime p:

$a^p \equiv a\pmod p$

Raising an arbitrary number a to prime p is congruent to a modulo p. Saying that in coder-speak, we get:

```pry
[4] pry(main)> (1..10).all? { |a| a ** 999983 % 999983 == a }
=> true
```

Raising any number to the 999983rd power, and dividing by 999983, gives a remainder of the original number.

If we take the math equation, and divide each side by a, we get:

$a^{p-1} \equiv 1 \pmod p$

…or…

```pry
[5] pry(main)> (1..10).all? { |a| a ** 999982 % 999983 == 1 }
=> true
```

If we raise our a values to one power less, our remainder mod 999983 is 1.

So this tells us that the last number in our sequence will be 1 for any generator. If there are no other 1’s in the sequence, then we have a complete shuffle of all the numbers less than our prime. If there are any other 1’s in the sequence, then we only have a subset, and our generator was not a primitive root.

Lagrange’s theorem tells us the locations that the other 1’s could possibly be in, which will make searching for primitive roots much less daunting. It states that for our finite cyclic groups, the order of any subgroup will divide the order of the entire group. Recall our generator 4 for prime 7:

```pry
[6] pry(main)> (1..6).map { |n| 4 ** n % 7 }
=> [4, 2, 1, 4, 2, 1]
```

`[4, 2, 1]` is the subgroup. It’s size is 3, a factor of the main group’s size, 6. The only other possible size of a subgroup is 2, the other factor of 6. This happens when 6 is the generator:

```pry
[7] pry(main)> (1..6).map { |n| 6 ** n % 7 }
=> [6, 1, 6, 1, 6, 1]
```

How this helps us is a little more clear with a slightly larger prime. Let’s use 13 as the prime, and see where the first 1 shows up for each of the generators:

```pry
[8] pry(main)> (1..12).map { |g| (1..12).find { |n| g ** n % 13 == 1} }
=> [1, 12, 3, 6, 4, 12, 12, 4, 3, 6, 12, 2]
```

For each of the generators, the first 1 was produced when n was a factor of 12 – and not always a prime factor. The position means that this is the order of the cyclic group, and the 1’s will repeat at every multiple of that number. To make that more obvious, let’s look at where all the 1’s appear:

```pry
[9] pry(main)> (1..12).each { |g| p (1..12).select { |n| g ** n % 13 == 1} }
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
[12]
[3, 6, 9, 12]
[6, 12]
[4, 8, 12]
[12]
[12]
[4, 8, 12]
[3, 6, 9, 12]
[6, 12]
[12]
[2, 4, 6, 8, 10, 12]
=> 1..12
```

If I want to test if a generator is a primitive root, the naive approach, given what we know now about where 1’s appear, is to search through each factor of 12 for each generator. But since the groups repeat, I only need to search in a pair of places: locations 4 and 6. If you look at the list above, there are a few items where 1 is generated only where n is 12, but each of the others has a 1 at location 4 or 6.

This is borrowing a trick from the Chinese Remainder Theorem, which searches for remainders by dividing a product by one factor at a time… sort of. For our use, we divide 12 by each of its unique prime factors, 3 and 2, giving us locations 4 and 6 where generators will always produce a 1 if they aren’t primitive roots.

That general rule will scale up to larger numbers. Using the prime 999983, our goal is to find a generator whose order is 999982, so we need to find 999982’s prime factors. Fortunately, Ruby makes that very easy:

```pry
[10] pry(main)> require 'prime'
=> true
[11] pry(main)> Prime.prime_division(999982)
=> [[2, 1], [79, 1], [6329, 1]]
```

The prime factors are 2, 79, and 6329. We need to divide 999982 by each of these to get our search points:

```pry
[12] pry(main)> exponents = Prime.prime_division(999982).map { |n| 999982 / n.first }
=> [499991, 12658, 158]
```

And we can use those to search for the first primitive root, by making sure the number produced at each of those locations isn’t a 1:

```pry
[13] pry(main)> (2..999982).find { |n| exponents.all? { |e| (n ** e) % 999983 > 1 } }
=> 5
```

## A little more security

If we stop there, we can use the first primitive root we found to produce all the numbers up to, but not including, the nearest prime to a million. This makes our sequence very guessible by any intruder familiar with discrete logarithms. They only need the last number generated to figure out the next one, if they assumed our sequence is generated from the most obvious starting point.

Fortunately, primitive roots have some other properties we can use to our advantage to give our imagined hacker a harder time.

The first thing we know about primitive roots is exactly how many there will be for any given prime. It is always the totient of 1 less than the prime. Why that is takes a little more number theory than I understand at the moment, but totients show up everywhere in modular arithmetic, so it’s at least not surprising. So… what the heck is a totient?

The totient of a number is the count of numbers less than it that are coprime to it (their only common factor is 1). They were introduced as a concept by Euler, as a corollary to Fermat’s little theorem, but to cover both prime and composite numbers. Totients are usually expressed with the Greek letter φ (phi). Euler’s theorem states that for any a and n that are coprime to each other:

$a^{\phi(n)} \equiv 1 \pmod n$

And if n is prime and a is less than n, this is exactly Fermat’s little theorem, because the totient of a prime will always be one less than it… because everything is coprime to a prime.

The naive method of calculating totients is just iterating over numbers less than something, and checking that their greatest common divisor is 1:

```pry
[14] pry(main)> def totient(n)
[14] pry(main)>   (1...n).count { |e| e.gcd(n) == 1 }
[14] pry(main)>   end
=> :totient
```

The are better algorithms for this, backed by mathematical proofs, but as it happens the naive approach is good enough for our purposes, as Ruby is fast enough to iterate over a million GCD checks. Euler didn’t have Ruby back in the 18th century, so he was more motivated to find a method with less overhead. Hold that thought.

If we recall our example of shuffling numbers between 1 and 12, there were 4 primitive roots, a number predicted by 12’s totient:

```pry
[15] pry(main)> totient 12
=> 4
```

How many primitive roots, then, will we have for numbers up to 999982?

```pry
[16] pry(main)> totient 999982
=> 493584
```

Close to half a million generators to choose from, and our hacker friend won’t know which we’ve picked. He’ll no longer be able to guess the next number without a set of samples that were generated all in a row, and lots of number crunching. Not Fort Knox, but a substantial improvement.

Another thing we know about primitive roots is that you can use the first one you find to generate all the others. Again, I’ll need to study some more number theory to find out exactly why this works, but if you take a primitive root of prime p and raise it to powers coprime to p - 1, and take the remainder mod p, you get nothing but other primitive roots.

Let’s test this by finding some numbers coprime to 999982:

```pry
[17] pry(main)> coprimes = (3..10).select { |n| n.gcd(999982) == 1 }
=> [3, 5, 7, 9]
```

...and turn those into more supposed primitive roots:

```pry
[18] pry(main)> roots = coprimes.map { |n| 5 ** n % 999983 }
=> [125, 3125, 78125, 953142]
```

Each element of our array should then pass the primitive root test:

```pry
[19] pry(main)> roots.map { |g| exponents.all? { |n| (g ** n) % 999983 > 1 } }
=> [true, true, true, true]
```

## Sanity Check

At this point the math checked out, but before using any of our found roots in production, I wanted to make sure I hadn’t messed up somewhere, and that the generators really wouldn’t duplicate any numbers. So I wanted to iterate over each possible generator and make sure it produced only unique values… which requires raising the generators to some very large exponents. While Ruby is nice about casting to BigIntegers and back again as needed, it is slower with calculations with large exponents than something compiled strictly for that purpose would be.

So I wrote a Java class to check my work:

```java
import java.math.BigInteger;
import java.util.HashSet;

public class dlgen {

  public static void main(String[] args) {
    BigInteger candidate = new BigInteger(args[0]);
    BigInteger prime = new BigInteger("999983");
    HashSet<Integer> h;

    h = new HashSet<Integer>(999983);
    for (int i = 0; i < 999983; i++) {
      int n = candidate.modPow(BigInteger.valueOf(i), prime).intValue();
      h.add(n);
    }

    System.out.println(candidate + ": " + h.size());
  }
}
```

This will create a HashSet of all the values produced by the generator, which has a nice side-effect of ignoring duplicates, so we can find the generator’s order by just asking for the set’s size. We know 5 and the other roots should produce 999982 values, so let’s see what a non-root generator produces:

```pry
[20] pry(main)> exponents
=> [499991, 12658, 158]
[21] pry(main)> exponents.map { |e| 4 ** e % 999983 }
=> [1, 629703, 6281]
```

OK, 4 should at least repeat at 499991. It may have that as its order, or either of 499991’s prime factors, 79 and 6329. Let’s see which:

    java # java dlgen 4
    4: 499991

499991 it is. How about 5?

    java # java dlgen 5
    5: 999982

Good. And the others?

    java # for g in 125 3125 78125 953142; do java dlgen $g; done
    125: 999982
    3125: 999982
    78125: 999982
    953142: 999982

Perfect! Reality matches our math, which is always comforting.

## The finale

We’ve done everything here except actually generate some random numbers, so let’s correct that gross oversight using the last of our small set of generators:

```pry
[22] pry(main)> (1..25).each { |n| puts( 953142 ** n % 999983 )}
953142
116579
230224
894271
739959
991227
146766
216919
124384
629997
808836
668828
895042
624936
875166
652479
711573
642463
879002
967343
916216
796738
360885
498330
327639
=> 1..25
```

That looks nice and randomy, but we know that the sequence will end with 1. If we want slightly more authentic randomness, we need to add some constant to our exponent, and then 1 will be generated at a different offset – remember, it’s a cyclic group, so the sequence loops.

Lastly, even though we have a very large set of generators to pick from, this method shouldn’t be confused with hard encryption. I’m going to use one of the other 78,000 primes less than a million in production than the one I’ve been blogging about, and I’m going to pick a random generator from the hundreds of thousands available for each prime, which will make sequence guessing an order of magnitude harder… but it’s still not cryptographically secure randomness, so don’t use this for things like passwords.

The ElGamal cryptosystem uses a discrete log cyclic group like this to assist with key exchanges, and achieves better security by using much larger primes, making the search space prohibitive. All I’ve done, and all you should use this method for, is generating pseudorandom sets with no duplicates.

## Postscript: A faster way to find totients

Totients have a couple of features that make them easier to calculate than by rote GCD checks. One is that totients of coprimes are multiplicative, the other is that the totient of a prime raised to a power k is representable as the prime raised to k - 1. Alright, let’s go see what all that means, and why those two things help…

We understand that the totient of a prime p is always p-1. The totient of 3 is 2, the totient of 5 is 4. Easy enough. But what’s the totient of 15? It’s factors are 3 and 5, which are coprime, so it’s totient is 2 \* 4. Let’s demonstrate that with a little FizzBuzz:

```pry
[23] pry(main)> def fizz_buzz(n)
[23] pry(main)>   (n % 15).zero? ? 'FizzBuzz' : (n % 5).zero? ? 'Buzz' : (n % 3).zero? ? 'Fizz' : n
[23] pry(main)> end
=> :fizz_buzz
[24] pry(main)> (1..15).map &method(:fizz_buzz)
=> [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

OK, that looks like it works. Now let’s count the values that stayed numbers:

```pry
[25] pry(main)> (1..15).count { |n| fizz_buzz(n).is_a? Integer }
=> 8
```

This works for any prime factors of a composite number that are coprime. If m and n are coprime, totient(mn) = totient(m) _ totient(n). However, this doesn’t work for powers of a prime. 5 squared is 25, but the totient of 25 isn’t 16 (4 _ 4), it’s 20. Here’s the count of numbers < 25 that aren’t a multiple of 5:

    1    6   11   16   21
    2    7   12   17   22
    3    8   13   18   23
    4    9   14   19   24

That’s 5 columns times 4 rows, for 20 numbers under 25 that are coprime to it. This can be represented by this identity (and in these equations φ(n) will mean totient(n):

$\phi(p^k) = p^{k-1}(p-1)$

If we multiply that by p/p, we can express the equation a little more usefully:

$\phi(p^k) = p^k \frac{p-1}{p}$

This also works if we’re looking for the totient of a prime not raised to any power – where k is 1:

$\phi(p) = p \frac{p-1}{p}$

Which simplifies to just p - 1.

It seems like we’re out in the weeds now, but there’s one fact that brings this all home: A prime raised to a power is still coprime to other prime numbers. So we have a way to represent totients of primes and their powers, and we know that totients of coprimes are multiplicative. Combining those, we can represent the totient of any number as the multiplication of its prime powers. Let’s take 40 as an example:

```pry
[26] pry(main)> totient 40
=> 16
```

$40 = 8 \times 5 = 2^3 \times 5$

8 and 5 are coprime to each other, so:

$\phi(8 \times 5) = \phi(8) \times \phi(5)$

Using our prime-to-a-power formula, the totients of 8 and 5 are:

$\phi(8) = 8 \times \frac{1}{2} , \phi(5) = 5 \times \frac{4}{5}$

Multiplying them together to get the totient of 40, we have:

$8 \times \frac{1}{2} \times 5 \times \frac{4}{5}$

If we multiply 8 and 5 in the above equation, we get one that contains the original number we’re finding the totient of, and fractions based on each of its unique prime factors:

$40 \times \frac{1}{2} \times \frac{4}{5}$

And that brings us to our final formula:

$$
\phi(n) = n\prod_{p|n} \frac{p - 1}{p}
$$

The totient of any number, is the original number times $\frac{p - 1}{p}$ for each of it’s unique prime factors. In Ruby, we can represent that formula like this:

```pry
[27] pry(main)> def totient(n)
[27] pry(main)>   factors = n.prime_division.map(&:first)
[27] pry(main)>   n * factors.map(&:pred).reduce(:*) / factors.reduce(:*)
[27] pry(main)> end
=> :totient
[28] pry(main)> totient 999982
=> 493584
```

...which runs many times faster than our original since we’re only iterating over 3 prime factors instead of close to a million GCD compares. In fact, let’s time them:

```pry
[29] pry(main)> require 'benchmark'
=> true
[30] pry(main)> Benchmark.measure { puts (1..999981).count { |d| d.gcd(999982) == 1 } }.real
493584
=> 0.12929600005736575
[31] pry(main)> Benchmark.measure { puts totient 999982 }.real
493584
=> 7.100001676008105e-05
```

The old method only took .13 seconds, which is why I didn’t start out trying to optimize it. But the new method took less than a millisecond (71 microseconds if you want to get technical, an 1,800x speedup), so if I were crunching truly large numbers, I’d definitely want that type of performance boost.

This level of math isn’t needed in everyday software development, but it’s handy to keep some number theory in your back pocket. Discrete logs, large primes, and totients appear all over encryption algorithms, so learning how some of that works gives you a good appreciation of how difficult security can be.
