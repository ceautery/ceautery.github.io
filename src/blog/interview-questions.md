---
title: "Five coding interview questions"
description: "Obama-era Curtis slings some code in a variety of languages to solve theoretical coding interview questions"
date: "2013-10-24"
hasMath: true
---

# Forward

Hi, 2025 Curtis here. I wrote this in 2013, from my last Windows machine. It was a couple years before leetcode was founded, when web frameworks like Angular were still in their infancies. Fellow devs, don't take interviews where questions like these are asked. It's silliness to expect someone to livecode in front of strangers, and how well a candidate does in that situation doesn't correlate with how well they'll do their job.

2013 Curtis, though, he was more interested in showing off than setting boundaries. These days I look for roles where collaboration and communication are important, and using a library for powersets and square roots is preferred over writing your own bespoke answer to a solved compsci problem.

That being said... on with the show!

# Five coding interview questions

Recently I took a contract with Automattic to build a WordPress plugin for them. We parted amicably with a Dear John letter instead of an offer letter, as the friction between our operating styles was greater in reality than it should have been on paper. I'll spare you the details.

Part of their onboarding ordeal is a coding challenge. In my case, it was to modify a dummy plugin to add a feature to it, with 7 days to polish it up. I bring this up only because what I expected, but which apparently wasn't part of the process, was a series of coding questions like the ones that follow. In fact none of the software dev interviews I've ever had have included questions like these. Granted I haven't applied to Google or Microsoft, and I don't live in The Valley, but still... nothing?

I sort of feel cheated, and because of that, I've decided to take the current first 5 questions from [Career Cup](https://web.archive.org/web/20170720082049/https://careercup.com/page?pid=coding-interview-questions) (defunct as of June 2024, this link is to the Wayback Machine archive) and give my take on them (actually at the time of this writing, this was the first 4 questions, skipping a few (design a web crawler, convert a float without using built-in functions, and remove an unsorted list's dups in O(n) time without using sorting or space - that last exceeds polite levels of ridiculous), and then the Goldman Sachs chess problem, since it looked interesting. Most coding questions like this don't require deep computer science knowledge so much as simply critical thinking, knowledge of basic set theory and data structures, and of course familiarity with the syntax of a programming language or two.

I'm not very familiar with Career Cup, but it was the top hit for coding interview questions on Google. It appears to be used by people seeking specific "right answers" to interview questions meant to glean deep subject knowledge, and hence defeating the entire exercise.

As I understand it, the point of a tech or coding interview is to feel out a candidate's style and general tack on problem solving, with the ideal question being a surprise out of left field that they need to ad lib to get through - sort of a Kobayashi Maru test. Finding that your exact set of questions has been studied for I don't imagine would go over very well. In most ways, I think the process Automattic uses is superior: Give someone a random one-time task that you won't give the next candidate.

And yet, sites like Career Cup are in abundance, trying to game the system. CC uses user-submitted questions purportedly from interviews they've had, most of which name the company the question belongs to. I'm uncertain how accurate that assumption is, or if it really matters. At any rate, here are the questions exactly as they appeared on CC, my interpretation of them, and my answers, spanning Go, Perl, Lisp, Java, PHP, JavaScript, and 18 years of experience in IT:

### 1. From Amazon.com:

> Find if all the leaf nodes are at same level in binary tree. Recursive and non-recursive approach?

Leaf? Node? Binary Tree? Alright, let's start with this completely pointless example:

```
        Beatles
          / \
         /   \
        /     \
       /       \
      /         \
   Alive     Not Alive
    / \         / \
   /   \       /   \
Paul  Ringo  John  George
```

A "tree" in computer science jargon, is a collection of objects, each of whom contain links to other objects. Each object + links is a node. A leaf is a node with no links, which I'm sure you already intuited, since we're talking about trees, after all.

In the tree above, each of our Beatles objects is simply a string, and a link to two other objects, until you get to the bottom. Each node having two links to other nodes makes this a binary tree. There are specialized types of trees (e.g., "cover trees" for nearest neighbor searches), and specialized binary trees (e.g, binary search trees whose insert functions reorder nodes to keep them sorted), but this isn't a tutorial on the concept, so I'd recommend this Google search if you want more theory and examples:

[tree programming site:.edu](https://www.google.com/search?q=tree+programming+site%3A.edu)

There are libraries for most programming lanuages for different tree types, but you don't need them for simple examples like this. Programming a tree is really just a design pattern; all you need is your language's variation on a struct or an object, and functions for managing inserts, searches, and deletes. I'll use Go, with the following declaration of a node:

```go
type Person struct {
    name  string
    mom   *Person
    dad   *Person
}
```

Yes, we're making a family tree of sorts, and yes the declaration of a node is really that simple. Adding to a tree is similarly easy:

```go
func (p *Person) addParent(name string, mom bool) {
    parent := Person{ name: name }
    if mom {
        p.mom = &parent
    } else {
        p.dad = &parent
    }
}
```

Our question wants us to determine if all the leaves are at the same depth. If I build a tree with the following:

```go
func main() {
    root := Person { name: "Self" }
    root.addParent("Mom", true)
    root.addParent("Dad", false)
    root.mom.addParent("Maternal Grandma", true)
    root.mom.addParent("Maternal Grandpa", false)
}
```

...then my tree looks like this:

```
         Self
          / \
         /   \
        /     \
       /       \
      /         \
    Mom         Dad
    / \
   /   \
Grams  Gramps
```

In this example, "Dad" is a leaf, and so are Grams and Gramps, but they are at different depths. So if I look at "Self" as the root node, the tree doesn't have all leaves at the same depth. However, if I start with "Mom", it does. So we need a way to programmatically iterate through all the nodes, find out if they're leaves, and track their depths. As the question suggested, this can be done both recursively and non-recursively.

Let's start with the recursive approach. I'm using a global variable, depth, which I set to the depth level of the first leaf I see. I iterate through the nodes with a recursive function call, and the first time I hit a leaf with a different depth than my global variable, I return false back through the call stack:

```go
package main

import (
    "fmt"
)

type Person struct {
    name  string
    mom   *Person
    dad   *Person
}

var depth int

func main() {
    root := Person { name: "Self" }
    root.addParent("Mom", true)
    root.addParent("Dad", false)
    root.mom.addParent("Maternal Grandma", true)
    root.mom.addParent("Maternal Grandpa", false)

    fmt.Println(checkDepths(&root, 0))
    fmt.Println(checkDepths(root.mom, 0))
}

func (p *Person) addParent(name string, mom bool) {
    parent := Person{ name: name }
    if mom {
        p.mom = &parent
    } else {
        p.dad = &parent
    }
}

func checkDepths(p *Person, d int) bool {
    if (p == nil) {
        return true
    }

    if (d == 0) {
        depth = -1
    }

    if (p.mom == nil && p.dad == nil) { // On a leaf
        if (depth == -1) {
            depth = d // init depth on first leaf
        }
        return (d == depth)
    }

    d++ // Not a leaf node, increment depth
    return ( checkDepths(p.mom, d) && checkDepths(p.dad, d) )
}
```

Results:

:::codez
**C:\gae_go\test>** _go run bintree.go_
false
true

C:\gae_go\test>
:::

Just as expected. Now, how can we do the same thing without recursion? Another way to represent a binary tree is with a simple array. An object's index on the array implies where it is on the tree. Here is a simple tree of index positions:

```
           0
          / \
         /   \
        /     \
       /       \
      /         \
     1           2
    / \         / \
   /   \       /   \
  3     4     5     6
 / \   / \   / \   / \
7   8 9  10 11 12 13 14
```

Nodes that aren't used on the tree are just empty (or "", since I'm using an array of Go strings here... slices, really, but there's an array under there somewhere). So if I wanted to represent the binary tree from the previous example, these indices would be used:

```
           0
          / \
         /   \
        /     \
       1       2
      / \
     3   4
```

Now I can iterate through the array sequentially, and use a little math to check whether or not I'm looking at a leaf. The following psuedocode performs the same checks as the Go program above:

```
Find the row number of the last index of the array
Set l to the first index on that row

Set n to 0
Increment n from 0 to l - 1
    if array index n is not empty, but indices 2n + 1 and 2n + 2 are, fail
If the loop exits without failing, return success
```

Why does that work? The last row contains all leaves (otherwise it wouldn't be the last row). I'm checking all the elements on rows above that for leaves. If I find any, then the leaves aren't all on the same depth. An element at index n is a leaf if it isn't empty, but indices 2n+1 and 2n+2 are.

Here's the psuedocode converted to working Go:

```go
func checkDepths() bool {
    lastIdx := float64(len(people) - 1)
    lastRow := int(math.Log2(lastIdx))
    l := int(math.Pow(2, float64(lastRow))) - 1 // Index of first elem in last row
    for n := 0; n < l; n++ {
        mom := 2 * n + 1
        if ( !isEmpty(n) && isEmpty(mom) && isEmpty(mom+1) ) {
            return false
        }
    }
    return true
}
```

The "isEmpty" function will check for the empty string at the given index, or the index being out of range of the array. Other than that, I'm using logs base 2 and raising 2 to powers to search for row numbers and indices, respectively. I'll trust that you can decode the math if you're so inclined.

What we can't do easily with a non-recursive function is pick a node other than root to drill down through, as I did in the recursive example. So to show a failure and a success with the new method, I'll call checkDepths, watch it fail, then finish fleshing out the binary tree and call it again. Here's the final code and results:

```go
package main

import (
    "fmt"
    "math"
)

var people []string

func main() {
    people = make([]string, 1, 126) // 7 rows, but an initial slice length of 1
    self:= 0
    people[self] = "Self"
    mom := addParent("Mom", self, true)
    dad := addParent("Dad", self, false)
    addParent("Maternal Grandma", mom, true)
    addParent("Maternal Grandpa", mom, false)
    fmt.Println(checkDepths())


    // Add remaining grandparents
    addParent("Paternal Grandma", dad, true)
    addParent("Paternal Grandpa", dad, false)
    fmt.Println(checkDepths())
}

func addParent(name string, parentOf int, mom bool) int {
    index := parentOf * 2 + 1
    if ! mom {
        index++
    }

    if len(people) < index + 1 {
        people = people[:index + 1]
    }
    people[index] = name
    return index
}

func checkDepths() bool {
    lastIdx := float64(len(people) - 1)
    lastRow := int(math.Log2(lastIdx))
    l := int(math.Pow(2, float64(lastRow))) - 1 // Index of first elem in last row
    for n := 0; n < l; n++ {
        mom := 2 * n + 1
        if ( !isEmpty(n) && isEmpty(mom) && isEmpty(mom+1) ) {
            return false
        }
    }
    return true
}

func isEmpty(index int) bool {
    if index >= len(people) {
        return true
    }
    return people[index] == ""
}
```

Results:

:::codez
**C:\gae_go\test>** _go run bintree2.go_
false
true

C:\gae_go\test>
:::

### 2. From Cadence inc

> Given a positive int "N". and an array of numbers ranging from 0-9 (say array name is arr). print all numbers from 0 to N which include any number from "arr".
>
> example: i/p: N=20 arr={2,3}
>
> o/p: 2,3,12,13,20

Again, these are the questions as-is on Career Cup. Let's re-describe what's being asked for:

Given a list of digits, and a count N, iterate from 0 to N, and print any number that contains any of the digits in the list.

So if my list of digits is `[2, 3]`, and my count is `20`, then the lines I return should be:

```
2
3
12
13
20
```

...because each of those numbers contains a digit in the list.

I posted a solution to this with regular expressions and Javascript, and then looked at the several answers posted before mine. Sadly, none of them used regular expressions, which is pretty sad, since they are especially well-suited to a problem like this. This won't serve as an intro into the power of regular expressions, but they make life a lot easier, and you should go make yourself an expert in them. You'll thank me.

Regex syntax allows for matching characters in a group. e.g., if I turn my list of 2 and 3 into a regex group match, it looks like this:

```javascript
/[23]/;
```

If I iterate from 0 to N, and turn each of those numbers into strings, I can bind that regex to them, and let the parser tell me if the current number matches anything in the group. The steps involved are remarkably simple, and most of the overhead in the code is creating the RegExp object with the array.join business:

```javascript
function matches(N, arr) {
  var m = [];
  var re = new RegExp("[" + arr.join("") + "]");
  for (var n = 0; n <= N; n++) {
    if (("" + n).match(re) != null) m.push(n);
  }
  return m;
}
```

Results:

```javascript
matches(20, [2, 3])[(2, 3, 12, 13, 20)];
```

The syntax for doing the same thing on commandline perl is a great illustration of why it is my favorite language. Here I'm using perl's marvelous grep function and range operator, simple regular expression syntax, and the "automagic" conversion of numbers to strings as needed:

```
$ perl -le '$N=shift; $re=join("", @ARGV); print for grep {/[$re]/} 0..$N' 20 2 3
2
3
12
13
20
```

### 3. From Facebook:

> We are given a set of integers with repeated occurences of elements. For Example, `S={1,2,2}`.
> We need to print the power set of S ensuring that the repeated elements of the power set are printed only once.
> For the above S, the power set will be `{NULL, {1}, {2}, {2}, {1,2}, {1,2}, {2,2}, {1,2,2}}`. So, as per the question requirements, we need to print `{NULL, {1}, {2}, {1,2}, {2,2}, {1,2,2}}`

The "Power Set" of set S is basically the set of all subsets of S. Good detailed descriptions are all over the net, such as in [this Wikipedia page](https://en.wikipedia.org/wiki/Power%5Fset).

Essentially we're being asked here to take the set `{1,2,2}`, create a power set out of it, and filter out the dups. In this case, that involves creating:

```
{NULL, {1}, {2}, {2}, {1,2}, {1,2}, {2,2}, {1,2,2}}
```

...and filtering out the extra {2} and {1,2}, leaving:

```
{NULL, {1}, {2},      {1,2},        {2,2}, {1,2,2}}
```

A programming language family well-suited to create powersets is Lisp. It's a language I find very fun, partially for for how arcane it is (making seasoned .NET or Java developers blanch in terror is high comedy to me), and it is perhaps the only language type to match my beloved Perl in expressiveness, as the power set generator below (written in the Emacs flavor of Lisp) illustrates:

```lisp
(require 'cl)

(defun powerset(s)
  (sort (delete-dups
         (reduce #'(lambda (one two) (append (mapcar #'(lambda(i) (cons two i)) one) one))
                 (sort s #'>)
                 :initial-value '(nil)
                 ))
        #'(lambda(a b) (< (length a) (length b)))
))
```

Results:

```lisp
(powerset '(1 2 2)) => (nil (1) (2) (1 2) (2 2) (1 2 2))
```

So what's going on here? First I should mention that this isn't a method I came up with on the fly, rather the underlying call sequence:

```
reduce -> append -> mapcar -> cons
```

...is a well known method to generate power sets using 4 powerful, idiomatic Lisp functions chained together. The method involves taking our source list S, and a working list W that starts empty. Iterate through each item in S, concatenating the item to everything in W, then appending the original W. Like so:

```
Init with S = (1 2 2), W = nil
First pass
  Take 1 from S, concatenate to everything in W, returning (1)
  Append the return (1) to W, giving W = ((1) nil)
Second pass
  Take 2 from S, concat with W, returning ((2 1) (2))
  Append the above return value to W, giving W = ((2 1) (2) (1) nil)
Third pass
  Take the final 2 from S, concat with W, returning ((2 2 1) (2 2) (2 1) (2))
  Append the above to W, giving a final set of ((2 2 1) (2 2) (2 1) (2) (2 1) (2) (1) nil)
```

A couple sorting tweaks are needed, and the duplicates haven't been addressed, but first let's take apart how the Lisp functions accomplish the process I just described. This blog entry won't serve as a tutorial on Lisp or its underlying data structures, but I'll hum a few bars to get through the example. Note that my explanations are not perfectly canon. I'd suggest taking a peek at [the GNU Emacs Lisp manual](https://www.gnu.org/software/emacs/manual/html%5Fnode/eintr/index.html), or [Common Lisp the Language, 2nd Edition](https://www.cs.cmu.edu/Groups/AI/html/cltl/clm/node1.html) for more in depth descriptions. Or if you happen to be a Douglas Hofstadter fan, his excellent book "Metamagical Themas" from the '80s has a [wonderful Lisp introduction](https://gist.github.com/jackrusher/5139396) that I can't recommend highly enough as a starting point.

First, everything surrounded by parentheses is a space separated list. Lists fed to the expression evaluator can be a function name and its arguments, e.g. `(cons 1 nil)`, or a "quoted" list containing literal values, e.g. `'(1 2 3)`.

cons: Create a "cons" out of the two variables passed. If the first variable is an atom and the second is a list, this prepends the list with the atom, returning the result as a new list.

```lisp
(cons 1 '(2 3)) => (1 2 3)
(cons 1 nil) => (1)
```

mapcar: Perform a function on each element of a list, returning all the results as a new list.

```lisp
(mapcar '1+ '(1 2 3)) => (2 3 4)
```

This can be combined with a "lambda" (anonymous function) that accepts one variable

```lisp
(mapcar #'(lambda(i) (cons i '(1))) '(1 2 3)) => ((1 1) (2 1) (3 1))
```

append: Combine the elements of multiple lists into one list.

```lisp
(append '(1 2 3) '(4 5 6) '(7 8 9)) => (1 2 3 4 5 6 7 8 9)
```

reduce: The doozy. Perform a two-parameter function across all elements of a list, keeping a running value as the first parameter in the next pass. This can start with the "running value" as the first list element, or a separate init value can be passed.

The easiest example is addition. In Lisp, the '+' function takes two variables, and returns their sum. e.g.:

```lisp
(+ 2 3) => 5
(reduce '+ '(1 2 3)) => 6
```

As with mapcar, the function can be swapped out for a lambda, provided it accepts two parameters. This is the same reduce as above, explicitly declaring the maths involved:

```lisp
(reduce #'(lambda(a b) (+ a b)) '(1 2 3)) => 6
```

Here is the syntax for setting an initial "running value", and the effect it has:

```lisp
(reduce '+ '(1 2 3) :initial-value 7) => 13
```

`reduce` is not a standard Emacs Lisp function, but can be imported by requring the "cl" (Common Lisp) library.

Let's go back to the meat of our solution to the question:

```lisp
(reduce #'(lambda (one two) (append (mapcar #'(lambda(i) (cons two i)) one) one))
        :initial-value '(nil)
        ))
```

...and our original list to pass to it: `'(1 2 2)`. Reduce is going to pass `(nil)` (that is, a set containing nil as an element) and 1 to the `lambda (one two)` function, which will trickle down to the cons function the equivalent of:

```lisp
(cons 1 nil) => (1)
```

...which will return to the mapcar the equivalent of:

```lisp
(mapcar #'(lambda(i) (cons 1 i)) '(nil)) => ((1))
```

...then that will be appended back with the current "one" value of `(nil)`:

```lisp
(append '((1)) '(nil)) => ((1) nil)
```

...and on the next pass we cons the first "2" to everything:

```lisp
(mapcar #'(lambda(i) (cons 2 i)) '((1) nil)) => ((2 1) (2))
```

...and append the current "one" `((1) nil)` back on:

```lisp
(append '((2 1) (2)) '((1) nil)) => ((2 1) (2) (1) nil)
```

...and one more pass fleshes out the power set. After that we can use Emacs Lisp's built-in "delete-dups" to pull out the extra (2) and (1 2), and some sort functions to straighten out the output the way we want.

If that's a little "out there" for your tastes, you don't need the power or expressiveness of Lisp (or the maddeningly nested parentheses) to answer this question, but you will need a straightforward method to generate a power set before you get mired in nested loops that don't quite spit out what you want. I'll demonstrate one such method in Javascript.

An easy way to iterate through all the possibilities of a power set is with binary counting. For example, the power set of `[1, 2, 3]` can be represented like so:

```
Subset        How many
             3's 2's 1's
Empty set     0   0   0
1             0   0   1
2             0   1   0
1, 2          0   1   1
3             1   0   0
1, 3          1   0   1
2, 3          1   1   0
1, 2, 3       1   1   1
```

So if we iterate from 1 to 8 ($2^3$, 3 being the set length), turn the number binary, and use each binary digit as a flag to determine what elements to include in each subset, we can easily generate the complete power set, including the empty set.

To remove the duplicates, we can turn each subset into a hash key, and set the value at that key to 1. If we hit the same key twice, it won't create a new hash element. Combine this with Javascript's ability to define custom sorts, and we can return the results in the desired order:

```javascript
function powerSet(arr) {
  var ps = {}; // power set hash

  for (var n = 0; n < Math.pow(2, arr.length); n++) {
    var tmp = [];
    for (var f = 0; f < arr.length; f++)
      if ((n >> f) % 2 == 1) tmp.push(arr[f]);
    ps[tmp.sort().join(",")] = 1;
  }

  function cmp(a, b) {
    return a.length < b.length ? -1 : a.length == b.length ? a - b : 1;
  }

  return Object.keys(ps).sort(cmp);
}
```

Results:

```javascript
powerSet([1, 2, 2])[("", "1", "2", "1,2", "2,2", "1,2,2")];
```

### 4. Also from Facebook:

> Write a function which returns the square root of a given number up to a precision of 0.0001. Only arithematic operations like addition, subtraction, division and multiplication are allowed.

Wikipedia has a [nice article](https://en.wikipedia.org/wiki/Square_root_algorithms) on manual methods of computing square roots. Back in the days before Javascript was fast, I created a script called "CMath" (C being the first letter in Curtis), which performed math on string objects, including square roots, computing pi and e, and arbitrary precision decimals.

This was before I was anything approaching a competent developer, and I did it solely for fun, not to solve any problem I was running into. The square root method I used is on the above Wikipedia page under "Decimal (base 10)". Essentially, you treat it as a long division problem, with the twist of building the next divisor digit based on 20x the current solution, and pulling down two digits at a time from the dividend. Here's an example of taking the square root of 1800:

```
 4
1800.0000
18  : first digit is largest digit whose square is less than 18
16  : 4^2 = 16, 5^2 = 25, so 4 is the first digit
 2  : Remainder of 2

 4 2.
1800.0000
18
16    : Answer so for is 4, 4 * 20 = 80. Look for largest n where
 200  : n(80 + n) < 200. 82 * 2 = 164, 83 * 3 = 249, so next is 2
 164  : 82 * 2 = 164
  36  : Remainder of 36

 4 2. 4
1800.0000
18
16
 200
 164
  3600  : 42 * 20 = 840. Need largest n(840 + n) < 3600
  3387  : 844 * 4 = 3387, 845 * 4 = 4225, so next is 4
   213  : Remainder of 213
...etc.
```

As you get more decimal digits, the remainders grow, and eventually get unwieldy if you aren't using a large integer library of some sort. Our question only wants accuracy to .0001, so we should still be able to fit the last remainder into a standard int.

Here's my implementation of that method in PHP, which takes copious advantage of the language's easy casting between strings and numbers:

```php
<?php

$in = $argv[1];
if (preg_match('/^\d+$/', $in)) $in .= ".00000000";
else if (! preg_match('/^\d+\.\d+$/', $in) ) {
    echo "Invalid number format. ### or ###.### only.\n";
    exit;
}

// Split number into left and right parts
list($l, $r) = explode('.', $in, 2);

// Left part must have an even count, lead with 0 if needed
if (strlen($l) % 2 == 1) $l = "0" . $l;

// Make right part 8 digits, to give us 4 decimals in solution
$r = substr( str_pad($r, 8, "0"), 0, 8); // Trim or pad to 8 digits

$ans = $remainder = "";
foreach(str_split($l . $r, 2) as $chunk) {
    $remainder .= $chunk;
    $tmp = $ans * 20;
    $n = $tmp == 0 ? 0 : (int)($remainder / $tmp);
    while (($tmp + $n) * $n <= $remainder) $n++;
    $n--;
    $ans .= $n;
    $remainder -= ($tmp + $n) * $n;
}
$ans = substr_replace($ans, ".", strlen($l) / 2, 0);
print "$ans\n";

?>
```

Results:

:::codez
**\$** _php sqrt.php 1800_
42.4264
**\$** _php sqrt.php 43046721_
6561.0000
**\$** _php sqrt.php 2_
1.4142
:::

This method isn't exactly intuitive, and recalling the specifics without a reference might be a problem, however it's easy to build an equivalent solution from first principles. Simply, we're looking for the square root S of a number N, so a formula to express that without a radix is:

$S^2 = N$

We're also looking to build that up one part at a time with A's and B's, where:

$(A + B)^2 = S^2$

A simple algebraic expansion of the left side of that equation it:

$A^2 + 2AB + B^2 = S^2$

In fact, the `2AB` is where our 20x comes from above. If A is a digit of the solution, and B another, then in reality A is in a decimal place with 10 times the weight of B, e.g., digits "2" and "4" really represent "20" and "4", or "200" and "40".

In the PHP solution above, our partial solution A is fed into the division problem as $A^2 + 2A$. To get to the correct equation, we need to take the `2A` part and add a little more to it:

$(2A + B) \times B = 2AB + B^2$

...which is exactly what the PHP solution above does. So this is another example of replacing a Google search with some basic maths to arrive at the same algorithm.

### 5. From Goldman sachs:

> A standard chess knight (it moves in its standard way i.e. L shaped OR 2.5 moves) is sitting at the position a1 on an N x N chess board. What is the minimum number of moves it will take to reach the diagonally opposite corner? P.S. - If it were a 8 x 8 chess board, the final destination for the knight would be h8

This is a critical thinking problem, and doesn't explicity call for any code. Restating the question, if my chessboard is N squares on a side, how many optimal moves will it take to get a knight from one corner to the opposite one? On the off chance you're unfamiliar with chess, a knight move is two vertical squares + one horizontal, or two horizontals plus one vertical.

Trying to tack diagonally across the board, each pair of moves puts the knight 3 squares up and 3 over. Finding the optimal _number_ of moves is marginally simpler than finding the optimal moves themselves. Here are the optimal moves (as far as I know - I haven't checked this against anything but first principles) for boards of side 4 through 11.

Optimal moves for board of size:

```
 4      5      6        7        8          9          10           11

...2  ..2.4  .....4  ......4  .....4.6  ........6  .........6  ........6.8
.1..  .....  ..2...  ....3..  ........  .....4...  .......5..  ...........
....  .1.3.  ....3.  .......  ....3.5.  .......5.  ..........  .......5.7.
0...  .....  .1....  ...2...  ........  ....3....  ......4...  ...........
      0....  ......  .1.....  ...2....  .........  ....3.....  ......4....
             0.....  .......  .1......  ...2.....  ..........  ....3......
                     0......  ........  .1.......  ...2......  ...........
                              0.......  .........  .1........  ...2.......
                                        0........  ..........  .1.........
                                                   0.........  ...........
                                                               0..........
```

Our optimal move count is always even, and stays the same for three board lengths in a row, making the math much easier than the verification. Now, what's up with a 3 x 3 board?

```
.14
3..
0.2
```

By the previous equation, it should take two moves to move the knight from corner to corner. Unfortunately, though, you can't actually fit a double-move on the board, as that would put the knight here:

```
   2
.1.
...
0..
```

So the math is pretty simple, and doesn't beg to be turned into code, but since the question was from a coding interview, I'll throw it into a simple Java class, taking advantage of Java's strong typing to find the size without needing to round:

```java
package cea.demos;

public class KnightMoves {

  private KnightMoves() { }

  public static int getOptimalMoveNum(int size) throws Exception {
    if (size < 3) throw new Exception("Size of board must be 3 or more");

    return size == 3 ? 4 : (size + 1) / 3 * 2;
  }

  public static void main(String[] args) throws Exception {
    StringBuffer sb = new StringBuffer();
    for (int n = 3; n < 20; n++) {
      sb.append("Board Edge length: ").append(n);
      sb.append(", Optimal move count: ").append(getOptimalMoveNum(n));
      sb.append('\n');
    }

    System.out.print(sb.toString());
  }

}
```

Results:

```
Board Edge length: 3, Optimal move count: 4
Board Edge length: 4, Optimal move count: 2
Board Edge length: 5, Optimal move count: 4
Board Edge length: 6, Optimal move count: 4
Board Edge length: 7, Optimal move count: 4
Board Edge length: 8, Optimal move count: 6
Board Edge length: 9, Optimal move count: 6
Board Edge length: 10, Optimal move count: 6
Board Edge length: 11, Optimal move count: 8
Board Edge length: 12, Optimal move count: 8
Board Edge length: 13, Optimal move count: 8
Board Edge length: 14, Optimal move count: 10
Board Edge length: 15, Optimal move count: 10
Board Edge length: 16, Optimal move count: 10
Board Edge length: 17, Optimal move count: 12
Board Edge length: 18, Optimal move count: 12
Board Edge length: 19, Optimal move count: 12
```

It's tempting to include printouts for the actual optimal moves, since if you look at my manual method above, I hashed out a simple algorithm that wouldn't be hard to implement. However, it's easy to overreach to try to look a little cooler or impressive. Experience has calmed me some, and while I'm confident I could have a working solution in a pass or two, I'm not cocky enough to push the issue in an interview.

Over the years my work has been solid under time pressure, with people hovering, with real money on the line, but it's a rookie move to dive into that situation when it's avoidable. It's better, I think, to answer the question that was asked, and not use it as a segue for showing off.

So those are some of the coding answers I may have been able to give, had I been asked, in a variety of languages. Am I for hire? Absolutely. It's my hope that mentioning that after several pages of code will naturally weed out the hiring managers I wouldn't click with.

Clicking, man... it's pretty damned important.
