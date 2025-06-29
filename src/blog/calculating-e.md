---
title: "Calculating e with Javascript"
description: "An intro to floating point numbers, the limits of binary fractions, Javascript large integer rounding, and how to generate Math.E the hard way."
date: "2013-11-26"
hasMath: true
---

# Calculating e with Javascript

> "In showing a painting to probably a critical or venomous lady, anger dominates. O take guard, or she raves and shouts." - Martin Gardner

The odd quote above is from one of Gardner's mathematical puzzles columns in Scientific American, and is a mnemonic aid for building the mathematical constant _e_ based on the lengths of each word, where the "O" from "O take guard" represents zero. Here's a quick Javascript console snippet showing how it works (and a shout out to my fellow regex nerds):

```javascript
> a = "In showing a painting to probably a critical or venomous lady, anger dominates. O take guard, or she raves and shouts".split(/\W+O?/)
  ["In", "showing", "a", "painting", "to", "probably", "a", "critical", "or", "venomous", "lady", "anger", "dominates", "", "take", "guard", "or", "she", "raves", "and", "shouts"]
> b = ""; for (var c in a) b += a[c].length
  "271828182845904523536"
> Math.E
  2.718281828459045
```

_e_ is, of course, the base of natural logarithms, the number representing 100% interest compounded continuously, and appears in a host of other maths and natural phenomena. This isn't a detailed account of _e_ and its uses, but rather an explanation of what's going on under the hood when calculating _e_ using IEEE-754 double-precision binary floating points - the only number format used in Javascript.

First off, Yes: Javascript doesn't have user-accessible integers. At all. It only has a primitive data type "number", represented by 64 bit floats, that users can manipulate. Curiously, the [ECMA 262 standard](https://www.ecma-international.org/wp-content/uploads/ECMA-262.pdf) for Javascript calls for "abstract operations" which convert user accessible numbers to and from internal representations of signed or unsigned integers for various operations.

One of the built-in expressions that employs that is bit-shifting, which according to the spec converts the left and right sides of the expression to signed and unsigned 32 bit integers, respectively, e.g.:

> ### 11.7.1 The Left Shift Operator ( << )
>
> Performs a bitwise left shift operation on the left operand by the amount specified by the right operand.
>
> The production _ShiftExpression : ShiftExpression << AdditiveExpression_ is evaluated as follows:
>
> 1.  Let lref be the result of evaluating ShiftExpression.
> 2.  Let lval be GetValue(lref).
> 3.  Let rref be the result of evaluating AdditiveExpression.
> 4.  Let rval be GetValue(rref).
> 5.  Let lnum be ToInt32(lval).
> 6.  Let rnum be ToUint32(rval).
> 7.  Let shiftCount be the result of masking out all but the least significant 5 bits of rnum, that is, compute rnum & 0x1F.
> 8.  Return the result of left shifting lnum by shiftCount bits. The result is a signed 32-bit integer.

First off, those instructions are horrible, however functional specs often suffer from this odd blend of verbosity and committee-speak. Interestingly, the rules imply bit shifting won't work on numbers larger than what can be represented by 32 bit ints. They also imply that bit shifting in Javascript may be less efficient than simply multiplying by a power of 2, since each operation involves casting to an int and back.

I say "may be" because after some very unscientific timing comparisons of `1 << 20` vs `Math.pow(2, 20)`, there was no clear winner. I attribute this to the recent speed wars of modern Javascript engines, employing various on the fly compiling and other optimizations, resulting in unpredictable speed test results, particularly after a warmup period.

### First steps

Q) What the hell is a float, really?

In IEEE 754, a double-precision float is a sign bit, 11 exponent bits offset by -1023, and 52 mantissa bits, expressed by this equation:

$$
-1^{\text{sign}} \times 2^{\text{exp}-1023} \times 1.\text{mantissa}
$$

...and for the low cost of $89, you can independently verify that from IEEE. As a cost-saving measure, I took the risky position of just [trusting Wikipedia](https://en.wikipedia.org/wiki/Double-precision%5Ffloating-point%5Fformat).

There are special cases for the min and max exponents (subnormals and infinity/NaN) which I won't go over, but for all other exponents the above equation is used. Let's go over a few examples:

**Decimal 1.0**

Starting very simply, let's look at the float representation of 1.

```
Sign:        0 (+)
Exponent: 1023 (0)
Mantissa:    0
```

The $-1^{\text{sign}}$ expression may be awkward if you are more of a programmer than a maths nerd. If that's the case, think of the sign bit as an "isNegative" flag. When the flag is 0, the expression evaluates to 1 (positive, i.e., isNegative is false, anything raised to 0 is 1), and when the flag is 1, the expression evaluates to -1 (raising to 1 is an identity operation). The results of that expression are then multiplied in with the results of the exponent and mantissa expressions, either leaving them alone or negating them, depending on the sign bit's value.

The exponent value given in the float is offset by -1023, so if I want a calculated exponent of 0 (so that the mantissa is multiplied by $2^0 = 1$), I use a real float of 1023. The equation for the float is then:

$-1^0 \times 2^0 \times 1.0$

...or...

$1 \times 1 \times 1.0$

The content of the float's 64 bits then, is:

Binary contents:

```
|s|-Exponent--|----------------------Mantissa----------------------|
  0 01111111111 0000000000000000000000000000000000000000000000000000
Hex representation:
|s+e|--Mantissa---|
  3FF 0000000000000
```

**Decimal -2.0**

```
Sign:        1 (-)
Exponent: 1024 (1)
Mantissa:    0

Binary:
|s|-Exponent--|----------------------Mantissa----------------------|
  1 10000000000 0000000000000000000000000000000000000000000000000000
Hex:
|s+e|--Mantissa---|
  C00 0000000000000
```

If you ever find yourself looking at bit values for floats, a good rule to remember is if only the first exponent bit is set (making the hex representation start with 400 or C00), that represents an exponent of 1, and an exponent expression of $2^1$, or 2. The equation for this float is:

$-1^1 \times 2^1 \times 1.0$

...or...

$-1 \times 2 \times 1.0$

**Decimal 0.4375 ($\frac{7}{16}$)**

```
Exp: 1021 (-2)
Mantissa: 110...

Binary:
|s|-Exponent--|----------------------Mantissa----------------------|
  0 01111111101 1100000000000000000000000000000000000000000000000000
Hex:
|s+e|--Mantissa---|
  3FD C000000000000
```

The ellipse after "110" I use to refer to 0, or, "here's where there's nothing else but repeating zeroes in the mantissa". So $\frac{7}{16}$ is being represented here as binary $1.11 \times 2^{-2}$`, or binary .0111. So what does that mean exactly?

You already know how decimal fractions work: Each digit is worth a tenth of the one on it's left. .07 is a tenth the size of .7. In binary, each digit is worth half the one on its left, so .1 is half of 1, .01 is half of .1 (and a quarter of 1), etc. So our .0111 is:

$\frac{0}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} = \frac{4}{16} + \frac{2}{16} + \frac{1}{16} = \frac{7}{16}$

**Decimal 43,046,721**

```
Exp: 1048 (25)
Mantissa: 01001000011010111010000010...
```

43046721 is an old favorite number of mine, representing the highest power of 3 that could fit on old-school pocket calculators that could only display 8 decimal digits, and would overflow on anything larger, returning just "E" for the answer. The number also appears in a lot of "homework help" questions on the Internet, where students go to great lengths to not learn simple concepts, spending vastly more energy dodging work than the work would entail. The question is usually this one:

> Fill in the missing number in this sequence:
> 3, 9, ..., 6561, 43046721.

Anyway, as a power of 3, the number requires more binary ones to express than you might expect, eleven total, including the implied 1 to the left of the mantissa. This is also the range of number I prefer to not try to convert to binary in my head, but use a calculator with that capability, or a Javascript console one-liner such as:

```javascript
> (43046721).toString(2)
  "10100100001101011101000001"
```

That results in 26 binary digits, which is expressible in float-speak as:

$2^{25} \times 1.0100100001101011101000001$

...and adding back in the 1023 offset on the exponent gives us 1048. Using our Javascript convertulatorizer shows us the binary:

```javascript
> (1048).toString(2)
  "10000011000"
```

...making our float value:

```
Binary:
|s|-Exponent--|----------------------Mantissa----------------------|
  0 10000011000 0100100001101011101000001000000000000000000000000000
Hex:
|s+e|--Mantissa---|
  418 486BA08000000
```

**Decimal 0.1**

Have you ever seen something like this as a result of a decimal operation, in any programming language?

```javascript
> .7 + .1
  0.7999999999999999
> 1.3 + .1
  1.4000000000000001
```

What causes that is a rounding error necessary to represent a base 10 fraction in base 2. Since there are no factors of 2 that are multiples of 10... actually, let me show you that:

```
   2
   4
   8
  16
  32
  64
 128
 256
 512
1024
2048
4096
8192
```

Note how the last digits repeat the sequence 2, 4, 8, 6. Nothing ends with 0, which means there is no way to express exactly one tenth using binary fractions. The closest you can come is binary .00011, or:

$$
\frac{1}{16} + \frac{1}{32} + \frac{1}{256} + \frac{1}{512} + \frac{1}{4096} + \frac{1}{8192}...
$$

This can be simplified to:

$$
\frac{3}{32} + \frac{3}{512} + \frac{3}{8192} + \frac{3}{131,072}...
$$

Does this really repeat by adding $3 \div \text{(next power of 2 ending in 2)}$? Yes, which I'll demonstrate. To start with, subtract one tenth by three thirty-seconds:

$$
\frac{1}{10} - \frac{3}{32} = \frac{32}{320} - \frac{30}{320} = \frac{2}{320} = \frac{1}{160}
$$

The difference is $\frac{1}{160}$ or $\frac{1}{(32 \times 5)}$. Now watch what happens when you subtract .1 by $(\frac{3}{32} + \frac{3}{512})$. First, let's simplify our subtrahend:

$$
\frac{3}{32} = \frac{48}{512} \text{ so } \frac{3}{32} + \frac{3}{512} = \frac{51}{512}
$$

Now do the subtraction:

$$
\frac{1}{10} - \frac{51}{512} = \frac{512}{5120} - \frac{510}{5120} = \frac{2}{5120} = \frac{1}{2560}
$$

You are left with $\frac{1}{2560}$, or $\frac{1}{(512 \times 5)}$, which again is 5 times the fractional place you were subtracting with. As you keep going, you remain $\frac{1}{(5 \times \text{current fraction})}$ away from one tenth. Once we get to the end of our 52 mantissa digits, some sort of rounding needs to take place. Javascript itself can tell you how it does the rounding:

```javascript
> (.1).toString(2)
  "0.0001100110011001100110011001100110011001100110011001101"
```

The last "1" should have been "011", but was rounded up so that the resulting binary fraction could fit in the mantissa. This means that .1 to Javascript means:

$$
\frac{3,602,879,701,896,397}{36,028,797,018,963,968}
$$

As far as estimation goes, being a couple quadrillionths off isn't half bad, however it happens to be just outside of the decimal range Javascript can display. There are a handful of additions between two float64 estimations of decimal digits that, when added together, are under this threshold, and Javascript (or your language of choice) exposes the fact that it's just been estimating all this time.

As any programming guide worth its salt will mention, if you need exact decimals, don't rely on floating points to give them to you. Either stick with whole numbers and divide at the end, or use a library that manages exact decimals for you.

Representing decimal .1 as a float looks like this:

```
Exp: 1019 (-4)
Mantissa: 100110011001100110011001100110011001100110011001101

Binary:
|s|-Exponent--|----------------------Mantissa----------------------|
  0 01111111011 1001100110011001100110011001100110011001100110011010
Hex:
|s+e|--Mantissa---|
  3FB 999999999999A
```

The hex representation of the mantissa is very interesting. Binary 1001 = hex 9.

### Calculating _e_

_e_ to 50 digits is 2.71828182845904523536028747135266249775724709369995, however a float64 can't allocate that many decimal digits of precision. Since our mantissa is 52 binary bits, that gives us $\log_{10} 2 \times 52 = 15.65355977452702$ decimal digits of precision, matching the number of decimal digits in the Math.E Javascript constant:

```javascript
> Math.E
  2.718281828459045
```

One method of calculating _e_ is as follows:

$$
\lim_{n \to \infty} (1 + \frac{1}{n})^n
$$

In English, _e_ is the limit as n approaches infinity of 1 and an nth raised to the nth power. You can see below how progressively larger values for n begin to converge on the value above:

```javascript
> function e(n) { return Math.pow(1 + 1/n, n); }
  undefined
> e(1)
  2
> e(10)
  2.593742460100002
> e(100)
  2.704813829421529
> e(1000)
  2.7169239322355203
> e(10000000)
  2.7182816939803724
```

How high, then, do we need to go to reach the precision of the built-in constant? The answer is unsurprising: $2^{52}$. Javascript is capable of representing higher values (in fact, it can go as high as $2^{1023}$), however that's the limit at which it maintains unit-accuracy. For example:

```javascript
> Math.pow(2, 52)
  4503599627370496
> Math.pow(2, 52) + 1
  4503599627370497

> Math.pow(2, 53)
  9007199254740992
> Math.pow(2, 53) + 1
  9007199254740992
> Math.pow(2, 53) + 2
  9007199254740994
```

When you raise 2 to the 53rd or higher power, you can no longer maintain accuracy down to the one's place. A similar thing happens with fractional portions at the same scale:

```javascript
> 1 + 1 / Math.pow(2, 52)
  1.0000000000000002
> 1 + 1 / Math.pow(2, 53)
  1
```

So $2^{52}$ is the limit of scale and accuracy. Let's plug that into the above e function:

```javascript
> e(Math.pow(2, 52))
  2.718281828459045
```

That exactly matches Math.E, and is accurate to the mathematical constant _e_ within $2.3 \times 10^{-16}$. If we move n up or down by just 1, we lose accuracy:

```javascript
> e(Math.pow(2, 52) + 1)
  2.7182818284590455
```

This gives us an extra digit, but the accuracy is slightly less. We're off by $2.6 \times 10^{-16}$

```javascript
> e(Math.pow(2, 52) - 1)
  2.718281828459044
```

As expected, going lower, while maintaining float64 precision, is less accurate according to the limit equation. In this case, the discrepancy is $1.2 \times 10^{-15}$

So that's _e_, Javascript numbers, double precision 64 bit binary floats, and behind the scenes type casts. I'll leave you with a quick reason not to try to implement this with bitshifting instead of Math.pow(). I mentioned above that the rules for bitshifting in Javascript imply they are accurate only when the number in question can be cast into a 32 bit int. Observe what happens with a larger number:

```javascript
> e(1 << 52)
  2.7182805322756565
> // Way off!
  undefined
> 1 << 52
  1048576
> 1 << (52 - 32)
  1048576
> 1 << 32
  1
```
