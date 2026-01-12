---
title: "Project Euler as an introduction to programming in Ruby"
description: "Project Euler as an introduction to programming in Ruby"
date: "2026-01-09"
hasMath: true
---

# Project Euler as an intro to programming in Ruby

|                                              |                                    |                                    |
| -------------------------------------------- | ---------------------------------- |------------------------------------|
| <a href="#who-am-i">Who am I?</a>            | <a href="#problem-0">Problem 0</a> | <a href="#problem-5">Problem 5</a> |
| <a href="#why-ruby">Why Ruby?</a>            | <a href="#problem-1">Problem 1</a> | <a href="#problem-6">Problem 6</a> |
| <a href="#who-are-you">Who are you?</a>      | <a href="#problem-2">Problem 2</a> | <a href="#problem-7">Problem 7</a> |
| <a href="#getting-set-up">Getting set up</a> | <a href="#problem-3">Problem 3</a> | <a href="#problem-8">Problem 8</a> |
| <a href="#project-euler">Project Euler</a>   | <a href="#problem-4">Problem 4</a> | <a href="#problem-9">Problem 9</a> |

Writing software is more fulfilling and enjoyable to me when I think of it as play. After 22 years as a professional developer, I still say "fun" in meetings much more than seems reasonable. "That looks like a fun ticket" (Project management nomenclature refers to development assignments in terms of "cards" or "tickets"), or after debugging a live production disaster with real money on the line: "That was a fun problem."

Because no matter what's at stake, you either enjoy what you do, or you don't. And I enjoy this work, whether I'm greenfielding a new project, fixing a bug, adding a button to a web page, making code easier to read, making it do less work to get to the right answer, no matter the purpose of the work, there's a puzzle to be solved. And I like puzzles.

Many of my ilk feel the same way, and so programming puzzle websites tend to get pretty popular. Sites with hard problems and strict time requirements like HackerRack and LeetCode are at their core just puzzles to be solved, but they're also used for coding interview prep, bragging rights, and disseminating imposter syndrome. I've poked around on them, but the vibe seems wrong. If you decide to visit that world, go for it, and remember that hashmaps are your friend.

Me, I prefer sites where the only constraint is eventually getting the right answer. The two I visit the most are [Advent of Code](https://adventofcode.com/), and [Project Euler](https://projecteuler.net/). AoC has story-based two part daily puzzles during December. You're one of Santa's helpers, and need to perform coding tasks to fix widgets and save Christmas.

Project Euler has straight math, grid, and combinatorics problems, releasing new problems at around one per week. They should hit problem 1,000 sometime this summer. The first handful of problems serve as a great introduction to software writing principles, and I'd like to take you through some of them here.

## Who am I?

I'm Curtis. I'm a nerd. I don't use that word self-deprecatingly, even though it was used as a slur in my childhood. In recent years I've volunteered in schools teaching tech classes, and one of the things that has brought me great joy is the complete abandon that today's kids call themselves nerds and geeks as a badge of honor.

I'm nobody famous or nerd-famous. I've been a professional software writer since 2003. I've been "online" before the consumer internet boom of 1995, when that meant either using a dial-up modem to call a timeshare service like CompuServe or Prodigy, or calling a local text-only BBS.

I've been a hobbyist programmer since before Java was a programming language, Linux was an operating system, or Google was a website. I've written code in BASIC, Pascal, C, C++. Java, Javascript, APL, DYL-280, COBOL, Perl, Awk, Ruby, and languages like Bash, SQL, and JCL that arguably aren't "real" programming languages, but I think they are.

The language I've liked the best out of all of them, since I started fiddling with code as a boy on my Apple // in the 1980s, is Ruby. Hands down.

## Why Ruby?

Ruby is readable and expressive, and easy to spin up on. It's [well documented](https://docs.ruby-lang.org/en/4.0/), and the docs are approachable. Its focus is on developer efficiency, which is why it powers so many startup tech companies where the biggest problem is adding features to their product quickly.

## Who are you?

In short, anybody. The main requirement is time. I've mentored 30-something adults retraining from a different career, I've taught middle school girls through [Girls Who Code](https://girlswhocode.com/), and both groups had the same ability to learn programming, and the potential to do it as well as me or better. The main differences were one of the groups was shorter and liked CW's The Flash more.

__Prerequisites__
* Curiosity
* Fifth grade math
* Imposter syndrome

That's it. Software writers aren't (necessarily) geniuses, they have a specialty. To someone without that specialty, those are easy to conflate. Many of us are well-read, some have advanced degrees and expensive certifications. But none of us started out that way, we just started with curiosity.

Why fifth grade math? That's around the time you learn about two important concepts in programming, modular math (like a clock - add 24 hours to the time, and it's the same time again) and that there can be number systems that don't use base 10, like binary (just zeroes and ones) and hexidecimal (0-9, then a-f to mean 10 through 15). There are specialties where you'll need more, if you're designing compilers or optimizing database engines, and for general development knowing about discrete logarithms and modular multiplicative inverses can get you out of a jam once in a while, but the everyday life of an application developer isn't math-heavy.

Imposter syndrome is that feeling that you don't belong, that you're around professionals but you aren't one yourself. Eventually your boss will figure out you don't know what you're doing, and you'll be shamed and fired, with your peers laughing at you as you put your personal items in a cardboard box. Every single software writer who isn't a sociopath suffers from this to some degree.

You will too. But just know it for the lie it is. You are good enough. You are smart enough.

## Getting set up

__Things you'll need__

* A code editor
* A terminal program
* A ruby version manager

If you're new to programming, a nice getting started guide that can walk you through some of the above is [MDN's Environment Setup Guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup)

This is from the Mozilla Developer Network, a great resource for both beginners and pros on web development topics. (Mozilla is the engine that runs the Firefox web browser, so the guides focus on things you need for making websites.) This guide is broken out into subtopics like finding a code editor and learning to get comfortable in a terminal.

[VSCode](https://code.visualstudio.com/) is a good code editor, and it has a terminal. I recommend starting with that if you're undecided on which editor to use.

If you're using a Chromebook that your school controls, you might need to get your school's IT people to help unlock this feature, but there is a linux development environment you can download on a Chromebook called Crostini that will let you [install VSCode](https://code.visualstudio.com/blogs/2020/12/03/chromebook-get-started). If your school is more hard nosed about letting you write code on their machines, all is not lost. There are websites like [Replit](https://replit.com/) and [Codeanywhere](https://codeanywhere.com/) that provide free virtual environments that you can use to practice writing code, but they both take a bit of fiddling to get to a good starting point.

For a ruby version manager, I recommend [Mise-en-place](https://mise.jdx.dev/), but if you have another tool such as asdf, rbenv, or rvm, use that instead. Our main goal in using a version manager is to make sure you're running a version of ruby that you control (e.g., not the built-in system ruby on macos), and that you can install "gems" (Ruby's word for libraries or packages) into.

Once you have everything from the "things you'll need" list, open a terminal and make sure you're in your home directory. In Linux-like environments you can type the command `cd ~` to get there. After that, enter this sequence of commands (substituting mise for your version manager, if needed):

```
mkdir dev
cd dev
mkdir euler
cd euler
mise install ruby@4.0.0
mise use ruby@4.0.0
```

This will give you a parent "dev" folder that you can put all your coding projects in, and a subfolder "euler" where we can tinker with Project Euler problems.

The "install" line will take a while, and it's likely that you'll run into a problem or two to solve before the install is successful. Google is your friend for those, and you'll learn some skills you'll need in the future to diagnose weird problems you're bound to run into.

It's in the nature of software development to run into problems installing tools. It's normal and expected. Don't give up! You're smart enough to sort through everything.

The "use" line will create a `mise.toml` file ([Tom's Obvious Minimal Language](https://toml.io/en/)) to tell mise which installed version of ruby to use in that directory. You can type `ls` to see that the file is there (or `dir` if you're on Windows). The next two commands will create `Gemfile`, and add the "pry" gem to it. Pry is a "REPL" (Read, Eval, Print, Loop) which does just what it sounds like. It reads the ruby statements you enter, evaluates them (runs them), prints what they return, and does all of that in a loop until you type `exit` or press ctrl-d.

```
bundle init
bundler add pry
pry
```

If everything worked, you should see this:

```pry
[1] pry(main)>
```

And from that prompt you can enter ruby commands. Here are a couple you can try:

```ruby
(1..10).to_a
File.read 'mise.toml'
```

...and what your terminal might look like after you run them:

```pry
euler # pry
[1] pry(main)> (1..10).to_a
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[2] pry(main)> File.read 'mise.toml'
=> "[tools]\nruby = \"4.0.0\"\n"
[3] pry(main)>
```

What's with the quotes and backslashes?

Anything inside of quotes or apostrophes (or double-quotes and single-quote in programmer parlance) is a [string](https://en.wikipedia.org/wiki/String_(computer_science)). It's a way to distinguish printed text from ruby commands. In single-quotes, the characters inside are the literal characters that will get printed, written to disk, added to a database column, what have you. Inside of double-quotes, backslash has a specific meaning, an [escape character](https://en.wikipedia.org/wiki/Escape_character). The character that comes next has a special meaning. `\n` is a newline (or line-feed), delimiting where a printed line ends and the next one begins. `\"` means a literal double-quote, to distinguish it from the end of the string itself.

What would be printed to the screen after the read command then would be:

```
[tools]
ruby = "4.0.0"

```

__Extra credit__

I don't care much for the default pry prompt, but it helped when I was first starting out.

The number at the beginning of each line is a good indicator of whether your command was accepted or not. If you hit enter and the number increments, you're good. If it doesn't, then there was a syntax error in the line. Maybe you missed a closing quote, parentheses, or bracket. If that's all it is, you can type the closing symbol on the next line and you'll be fine. If the problem is more complicated, you can press ctrl-c to break out of that line, and start again at the next prompt.

If you would like, you can change pry's prompt to be just a simple `>> ` by creating the [runcom](https://superuser.com/questions/144339/vimrc-screenrc-bashrc-kshrc-etc-what-does-the-rc-mean) file `.pryrc` and setting the default prompt. Here's a ruby command you can enter to do that:

```ruby
File.write('.pryrc', 'Pry.config.prompt = Pry::Prompt[:simple]')
```

`File.write` is doing a lot of operating system magic behind the scenes and hiding the details. The above line is roughly the equivalent of this:

```ruby
File.open('.pryrc', 'w') { |f| f << 'Pry.config...' }
```

This method exposes some more of the mechanics behind writing to a file. We're opening a file in "write" mode, serving a [file handle](https://en.wikipedia.org/wiki/File_descriptor) (`f`) to the block, and the block "shovels" (`<<`) a string to the file handle. Shoveling is a rubyism for adding to something. You shovel to write to a file, shovel to append to an array, and shovel to concatenate a string.

If you decide you want a simpler prompt and enter the command above, the next time you run pry things will look like this:

```pry
[3] pry(main)> File.write('.pryrc', 'Pry.config.prompt = Pry::Prompt[:simple]')
=> 40
[4] pry(main)> exit
euler # pry
>> 7 * 12
=> 84
```

## Project Euler

If the internet is to be believed, Project Euler was started by Colin Hughes in 2001. His name appears nowhere on the page, and he keeps a low profile. He has given only one interview that I can find, for [this Atlantic article](https://www.theatlantic.com/technology/archive/2011/06/how-i-failed-failed-and-finally-succeeded-at-learning-how-to-code/239855/). As an introvert, I appreciate that he doesn't wish to give talks about his creation in the vein of Evan Czaplicki (Elm) or Eric Wastl (Advent of Code), but nonetheless he created something very popular with us nerds.

The site is named after the 18th century mathematician Leonhard Euler of $e^{i\pi} + 1 = 0$ fame, one of his [many contributions](https://en.wikipedia.org/wiki/Contributions_of_Leonhard_Euler_to_mathematics) to math.

The site is at [projecteuler.net](https://projecteuler.net/), and the front page gives a good description of the types of puzzles it has. In short, each puzzle is computationally expensive, a chore to solve by hand, and your goal is to write a small computer program to solve them.

The [registration page](https://projecteuler.net/register) presents you with Problem Zero, to give you a taste of what you're getting yourself into, which you must solve as part of the registration process. To discourage cheating, it includes a randomly generated number, so that each user's answer will be different.

## Problem 0

> A number is a perfect square, or a square number, if it is the square of a positive integer.
> For example, $25$ is a square number because $5^2 = 5 \times 5 = 25$; it is also an odd square.
> 
> The first 5 square numbers are: $1, 4, 9, 16, 25$, and the sum of the odd squares is $1 + 9 + 25 = 35$.
> 
> Among the first (random number in the hundreds of thousands) square numbers, what is the sum of all the odd squares?

This section is going to be long, because I'll be introducing several basic programming concepts. If the binary/bitwise sections don't click right away, that's fine. They're a little alien the first time you come across them. But get to know them eventually; they're a lot of fun, and it's good to have a mental model of how things work.

So... we need to find yay-many odd squares and add them up. First, how do you tell if a number is odd? In ruby, just ask the number.

```pry
>> 1.odd?
=> true
>> 2.odd?
=> false
```

`1` is an [instance](https://en.wikipedia.org/wiki/Instance_(computer_science)) of the Integer class. `.odd?` is a [method call](https://en.wikipedia.org/wiki/Method_(computer_programming)) on that instance.

What ruby does under the hood in the `odd?` method is [bitwise math](https://en.wikipedia.org/wiki/Bitwise_operation). Before we talk about that, here's a quick refresher on binary numbers. Binary (or base two) numbers represent numbers with just the digits 0 and 1 as powers of two.

85 in binary would be `1010101`. Here's what each digit means:

```
 16-------------| |-------------8's place
 32-----------| | | |-----------4's place
 64---------| | | | | |---------2's place
128-------| | | | | | | |-------1's place
          0 1 0 1 0 1 0 1
```

In other words, `64 + 16 + 4 + 1 = 85`

I have a leading zero here to pad the number out to a standard [byte](https://en.wikipedia.org/wiki/Byte) of 8 "bits". This is how computers store information in memory and on disk, with each tiny piece of memory or storage being either on (1) or off (0).

A number is odd if the last bit is 1, and we can check for that with a bitwise `AND` operation with the number 1.

`AND` compares two numbers bit by bit, and returns a new number composed of where both bits were 1, like so:

```
    0 0 1 1 0 1 0 1  (53)
AND 0 1 1 0 0 0 1 1  (99)
  = 0 0 1 0 0 0 0 1  (33)
```

If we do a biwise `AND` with our original 85 and 1, this happens:

```
    0 1 0 1 0 1 0 1
AND 0 0 0 0 0 0 0 1
  = 0 0 0 0 0 0 0 1
```

Or as we would express it in ruby:

```pry
>> 85 & 1 == 1
=> true
```

`&` is a bitwise AND, like the above examples, where `&&` is a logical AND. `(condition_1) && (condition_2)` returns true if both conditions are true, false otherwise.

The double equals sign here is asking "is this equal to that?", which returns a true or false. A single equals sign is used for assigning values to things.

```pry
>> my_number = 12
=> 12
>> my_number + 1
=> 13
```

Don't fret over binary numbers or bitwise math. It's important to know they exist, but it's rare to need to resort to them directly. And although you can ask `85 & 1 == 1`, it isn't idiomatic ruby. But it's fast, which is why `.odd?` does it under the hood. A more idiomatic way to ask the same question without just reaching for the `.odd?` method is:

```pry
>> 85 % 2 == 1
=> true
```

`%` is the "modulus" operator. It returns the remainder part of division. So this says "if I divide 85 by 2, is the remainder 1?". You'll use modular math a lot.

Now back to the example in Problem 0, how do I iterate from 1 to 5, square all the numbers, and sum up the odd ones? The naive [imperative](https://en.wikipedia.org/wiki/Imperative_programming) way to do that would be:

```ruby
sum = 0
counter = 1
while counter <= 5
  square = counter ** 2
  sum += square if square.odd?
  counter += 1
end
```

This is bad for two reasons. One, it's ugly as sin. And two, we're doing more work than we need to. But let's step through the new concepts introduced in that block of code.

```ruby
while (condition)
  # Do stuff
end
```

This is a `while` loop. It repeats a block of code until `condition` no longer holds true. In this case, so long as `counter` is less than or equal to 5. So it will run until counter is greater than 5... which we could also say.

```ruby
until counter > 5
  # Do stuff
end
```

The `#` character ("pound", or "hash" if you're old-school) delimits where a comment starts. When debugging code, it's common to put a `#` at the beginning of a line of code to "comment out" the line. Comments are also used when you want to explain something to a future reader, or your future self. We forget things, so be kind to your future self, and comment your code when you're doing something strange, or if some added context is needed to understand all the moving parts.

```ruby
square = counter ** 2
```

In ruby and most programming languages, the four basic arithmetic operations $+, -, \times, \div$ are represented by `+, -, *,` and `/`. So one asterisk (`*`) is multiplication. But two asterisks (`**`) is raising to a a power.

So `counter ** 2` is the square of whatever the current value of counter is. Doing that instead of `counter * counter` is a stylistic choice, either way is fine. As Larry Wall would say, [there's more than one way to do it](https://en.wikipedia.org/wiki/Perl#Philosophy) (known as "TMTOWTDI" or "Tim Toady" in the Perl community).

```ruby
sum += square if square.odd?
```

`+=` means "increment by". `sum += square` is the same as saying `sum = sum + square`. In both cases we're incrementing `sum` by whatever `square` is set to. The trailing `if` is a peculiarity of languages like ruby. A normal `if` block looks like this:

```ruby
if (condition)
  # Do stuff
else
  # Do something else
end
```

The `else` is optional. Ruby has a special variant of `else` for handling multiple conditions, `elsif`:

```ruby
if (condition_1)
  # Do something if condition_1 is true
elsif (condition_2)
  # Do something if condition_1 is false, but condition_2 is true
else
  # Default action if neither condition is true
end
```

A trailing `if` is [syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for handling a condition for one line of code, where an `else` block isn't needed.

Now, here is a much cleaner, [functional](https://en.wikipedia.org/wiki/Functional_programming) way to write the above block of code.

```ruby
(1..5).map { |n| n ** 2 }.select(&:odd?).sum
```

If we try that in pry:

```pry
>> (1..5).map { |n| n ** 2 }.select(&:odd?).sum
=> 35
```

...then we get the answer from Problem 0's example.

This is using several core concepts to rubying which we can dive into with pry.

```ruby
(1..5)
```

This is a "Range". In pry we can see what class anything is by calling `.class` on it.

```pry
>> r = (1..5)
=> 1..5
>> r.class
=> Range
```

Pry also provides an `ls` command that lets you list what methods can call on an object, and where they are inherited from.

```pry
>> ls r
Enumerable#methods:
  all?            drop              find_all    min_by        slice_when
  any?            drop_while        find_index  minmax_by     sort
  chain           each_cons         flat_map    none?         sort_by
  chunk           each_entry        grep        one?          sum
  chunk_while     each_slice        grep_v      partition     take
  collect         each_with_index   group_by    reduce        take_while
  collect_concat  each_with_object  inject      reject        tally
  compact         filter            lazy        select        to_h
  cycle           filter_map        map         slice_after   uniq
  detect          find              max_by      slice_before  zip
Range#methods:
  %      bsearch  end           first     last     minmax        size  to_set
  ==     count    entries       hash      max      overlap?      step
  ===    cover?   eql?          include?  member?  pretty_print  to_a
  begin  each     exclude_end?  inspect   min      reverse_each  to_s
```

Ranges and arrays are the two basic "collection" classes that implement simple ordered lists of things, and they both inherit from [Enumerable](https://docs.ruby-lang.org/en/4.0/Enumerable.html), a group of methods that iterate over collections in different ways.

The basic difference between a range and an array is that a range is just instructions for generating a list, where an array has each item in the list in memory. We can [cast](https://en.wikipedia.org/wiki/Type_conversion) a range to an array by calling `.to_a` on it.

```pry
>> r.to_a
=> [1, 2, 3, 4, 5]
```

```ruby
.map { |n| n ** 2 }
```

Calling `map` on a collection also returns an array, but lets you modify the contents by running a block of code on each item. To pass a block of code, simply wrap the code in curly braces. After the opening brace, put the variable(s) you expect to receive on each loop inside of pipes (`|`), name the variable anything you wish, and everything after is the code you want to run on the elements.

In this case, we're squaring each element.

```pry
>> r.map { |n| n ** 2 }
=> [1, 4, 9, 16, 25]
```

There's a variant of passing blocks if you need multiple lines. Instead of curly braces, use a do..end block.

```ruby
(0..10).map do |n|
  if n.zero?
    "Can't divide by zero"
  else
    n / 2.0
  end
end
```

Let's run that in pry, just copy and paste the whole chunk of code into pry and hit enter, and your session should look like this:

```pry
>> (0..10).map do |n|
>>   if n.zero?
>>     "Can't divide by zero"
>>   else
>>     n / 2.0
>>   end
>> end
=> ["Can't divide by zero", 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]
```

Using `2.0` instead of `2` for the division makes ruby treat the numbers to be floating point numbers instead of integers. "Floats" or "longs" are numbers that _can_ have digits after the decimal. Internally they're stored in binary, which can't perfectly represent a base 10 decimal, so sometimes they misbehave if you're not very careful.

And yes, just like you can call `odd?` on a number, you can call `.zero?` on it to see if it's a zero. That does the same as `n == 0`.

```ruby
.select(&:odd?)
```

Like `map`, `select` operates on collections. Pass it a block that returns true or false, and the array it returns will only contain the values that came up true.

`&:odd?` is another piece of syntax sugar to save you a little typing. If you're calling a single method on each element, pass it in just with `&:` before the method name. `&:odd?` is functionally the same as:

```ruby
.select { |n| n.odd? }
```

```pry
>> squares = r.map { |n| n ** 2 }
=> [1, 4, 9, 16, 25]
>> squares.select &:odd?
=> [1, 9, 25]
```

```ruby
.sum
```

`.sum` on an array or a range adds up all the elements. It also takes an optional block and sums up all the values the block returns.

```pry
>> [4, 6, 8].sum { |n| n / 2 }
=> 9
```

And chaining all that together, we get what we started with:

```pry
>> (1..5).map { |n| n ** 2 }.select(&:odd?).sum
=> 35
```

Now, why is this still the wrong way to do it? Because we never needed to square everything and then find the odd values. You only get an odd product when you multiply two odd integers, so we just needed to start at 1, and then count by 2s.

In a range, you can do this with a method called `step`.

```pry
>> (1..5).step(2).to_a
=> [1, 3, 5]
>> (1..5).step(2).map { |n| n ** 2 }
=> [1, 9, 25]
>> (1..5).step(2).map { |n| n ** 2 }.sum
=> 35
```

At a scale this small, the difference is minimal, but if our range is going to be in the hundreds of thousands, the `.step` way will save us a lot of CPU time and memory.

```pry
>> (1..500_000).step(2).map { |n| n ** 2 }.sum
=> 20833333333250000
```

Ruby numbers ignore the underscore character (`_`), so you can use them as formatting the same way you would with commas in print.

Now... why is this _still_ the wrong way to do it? Because it's a solved problem and there's a math equation for it. The sum of the squares of the first N odd numbers is:

$$\frac{N(2N + 1)(2N - 1)}{3}$$


We can define that as a method:

```ruby
def sum_odd_squares n
  n * (2 * n + 1) * (2 * n - 1) / 3
end
```

To define a method, start with `def`, give the method a name (`snake_case` is a convention for naming variables and methods in ruby), and a "signature", or the variables it expects. We just have one variable, so we don't need to wrap it in anything special. If we need more than one variable, we'll use parenthesis so it's less ambiguous, but often the ruby interpreter can sort everything out anyway.

Before we run that, there's some nuance in the description: The first N odd numbers. Our original loop goes to 500,000 by twos, so that would be the first 250,000 odd numbers. We can verify that by calling `.size` after `.step`:

```pry
>> (1..500_000).step(2).size
=> 250000
```

If you paste that into pry and hit enter, then call it with 250,000, you'll get the same answer as the method that went through the entire loop:

```pry
>> def sum_odd_squares n
>>   n * (2 * n + 1) * (2 * n - 1) / 3
>> end
=> :sum_odd_squares
>> sum_odd_squares 250_000
=> 20833333333250000
```

One of the things you probably noticed is that both methods seem to run at the same speed, even though the first one is clearly doing more work. Computers are pretty fast, and CPUs are great at doing things in a loop, so a half-million of something is child's play for today's computers.

We have to look a little closer to see that the algebra method is doing a lot less work. Fortunately, ruby has a handy benchmarking class. It isn't loading into memory at first, so we have to `require` it to get it loaded.

```pry
>> require 'benchmark'
=> true
```

And then we can call `measure` directly on the `Benchmark` class, and pass it a block, and it will tell you how long it took to run as precisely as the CPU can measure.

```pry
>> Benchmark.measure { (1..500_000).step(2).map { |n| n ** 2 }.sum }
=> #<Benchmark::Tms:0x00000001231bed00
 @cstime=0.0,
 @cutime=0.0,
 @label="",
 @real=0.043274000054225326,
 @stime=0.0005879999999995889,
 @total=0.0432529999999991,
 @utime=0.04266499999999951>
>> Benchmark.measure { sum_odd_squares 250_000 }
=> #<Benchmark::Tms:0x00000001231b86d0
 @cstime=0.0,
 @cutime=0.0,
 @label="",
 @real=4.999921657145023e-06,
 @stime=3.000000000419334e-06,
 @total=1.600000000046009e-05,
 @utime=1.3000000000040757e-05>
```

The `@` signs before all the variable names mean that those are "instance variables", that each method in the class instance has access to. There's some system architecture theory behind why the times are split up into so many variables, but I typically just go by the `@real` time.

Before we compare the two "real" values, a bit about the `e-06` notation. That's a standard way to express scientific notation in most programming languages. The number after `e` is how many places to move the decimal point:

```pry
>> 1e3
=> 1000.0
>> 1e-3
=> 0.001
```

So the first `@real`, 0.043... is the same as `4.3e-2`

```pry
>> 4.3e-2
=> 0.043
```

Which means the second `@real` is four additional decimal places to the right, so somewhere between 1,000 and 10,000 times faster. We can divide to get the actual speed difference scale.

```pry
>> 0.043274000054225326 / 4.999921657145023e-06
=> 8654.935621318307
```

In this case, calculating our answer the algebraic way was 8,000-ish times faster. On a scale this small, that still doesn't matter a lot, but part of being a good programmer is training your mind to think about problems this way.

If you're supporting a production system with a growing user base, your system will eventually be under a heavy load. Even if it takes longer to research and write the code, even if the naive, straightforward approach seems to run fast enough on your development machine, each step you save in production pays off big down the road.

That being said, our goal here is to learn programming with ruby, so for most of the rest of the problems I'll skip the secondary optimization.

You have the tools to solve problem 0 now. So... go register your account!

## Problem 1

First, since I'm a lunatic and wrote this just as one long page, I suggest you use the table of contents to navigate. This will also help keep track of your progress, since links you've visited from there should be in a different color. Second, I don't want the actual answers to the problems to appear on this site, even though I'm spelling out exactly how to solve them. I'll leave off the last step in the solutions, and make sure you have the context to finish. Usually the last step is just adding up a list of numbers.

And good news! You learned enough about the ruby language in problem 0 to make the rest of the problems easier. We'll still cover some new concepts in each problem, but it will be less of a firehose.

After you register, and each time you sign in, you should be taken to the Archives link, where you can see the names of the first 50 problems. If not, you can navigate directly to each problem by it's number with the web address format:

`projecteuler.net/problem=(problem number)`

So problem 1 is at [projecteuler.net/problem=1](https://projecteuler.net/problem=1)

> If we list all the natural numbers below $10$ that are multiples of $3$ or $5$, we get $3, 5, 6$ and $9$. The sum of these multiples is $23$.
> 
> Find the sum of all the multiples of $3$ or $5$ below $1000$.

It's probably a coincidence since this question was written in 2001, but after 2007 developers became very familiar with finding multiples of 3 and 5 after [this blog post](https://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/) by Imran Ghory. It reads like something you might find on the [r/LinkedInLunatics/](https://www.reddit.com/r/LinkedInLunatics/) subreddit - Most developers CAN'T CODE!! - but he suggested a simple spot-check to see if a job candidate could sling any code at all, and it really caught on with tech hiring managers.

He suggested candidates write a small program that played the first hundred rounds of the children's counting game Fizz-Buzz.

If you've never played before, a group of kids go around in a circle and count sequentially from 1. For every number that is a multiple of 3 you say "fizz" instead of the number, for every multiple of 5 you say "buzz", and for every multiple of both (i.e., every multiple of 15) you say "fizzbuzz".

To write a program that does that, you need to be able to find multiples of numbers, handle ternary logic, and print to the screen. Pretty basic stuff for a dev, so it's not a terrible way to sort wheat from chaff.

More common these days in tech interviews is being asked some abstract questions and just talking through them, a "take home" assignment where you fix some incomplete code (Cyberstar does a variation of this), or a brief contract to implement a real feature in their codebase where you get paid an hourly rate. I've done all three. There's no perfect formula for finding the right candidate, so it's always a clumsy process.

Anyway, we're not fizzbuzzing, we're adding up multiples of 3 and 5. The example from Problem 1 asks to find natural (counting) numbers below 10. We could write that as `(1..9)`, but I like to use numbers from the example where possible. Ruby has an alternate syntax for ranges: three dots instead of two means "up to but not including". So we can say:

```pry
>> (1...10).to_a
=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

If we look at all of those numbers modulo three:

```pry
>> (1...10).map { |n| n % 3 }
=> [1, 2, 0, 1, 2, 0, 1, 2, 0]
```

...we can see that all the multiples of three have zero as the remainder, like you'd expect. Now we can select them.

```pry
>> (1...10).select { |n| (n % 3).zero? }
=> [3, 6, 9]
```

We need to also include the ones that are multiples of five. Just like with the ampersand (`&`), there's a bitwise OR using a single pipe symbol (`|`), and a logical OR using two pipes. `(condition_1) || (condition_2)` returns true if either condition is true. We can use that here to include multiples of 5 in the list.

```pry
>> (1...10).select { |n| (n % 3).zero? || (n % 5).zero? }
=> [3, 5, 6, 9]
```

The same numbers as the example. Now we just tack on a `sum` at the end.

```ruby
(1...10).select { |n| (n % 3).zero? || (n % 5).zero? }.sum
```

```pry
>> (1...10).select { |n| (n % 3).zero? || (n % 5).zero? }.sum
=> 23
```

The same answer as the example. Now to solve the problem you just need to make the range up to but not including 1,000.

## Problem 2

> Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with $1$ and $2$, the first $10$ terms will be:
> 
> $$1, 2, 3, 5, 8, 13, 21, 34, 55, 89, \dots$$
> 
> By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

If there's something devs love as much as threes and fives, or prime numbers in general, it's Fibonacci numbers. We're eager to tell people how much they show up in nature. Petals on a flower, rows on a pinecone, branch patterns on a tree. For some reason they took over agile estimation meetings for those shops that assign "points" to tickets, where the number is always a Fibonacci number.

Usually the sequence starts with `[1, 1]` and the first generated number is 2, though, not starting directly with `[1, 2]`. But since we're looking for the sum of the _even_ digits, we could start either way and get the same answer.

So we have two ruby questions to answer before we can solve this: How do I add to an array? How do I get the values of the last two array elements?

First let's make an array to play with, and see what methods it exposes. My usual tinkering array is the digits in Westerville's zip code:

```pry
>> arr = [4, 3, 0, 8, 1]
=> [4, 3, 0, 8, 1]
>> ls arr
Enumerable#methods:
  chain           each_slice        flat_map  max_by     slice_after
  chunk           each_with_index   grep      member?    slice_before
  chunk_while     each_with_object  grep_v    min_by     slice_when
  collect_concat  entries           group_by  minmax_by  sort_by
  each_cons       filter_map        inject    partition  tally
  each_entry      find_all          lazy      reduce     to_set
Array#methods:
  &              cycle         freeze        pretty_print_cycle    slice
  *              deconstruct   hash          product               slice!
  +              delete        include?      push                  sort
  -              delete_at     index         rassoc                sort!
  <<             delete_if     insert        reject                sort_by!
  <=>            detect        inspect       reject!               sum
  ==             difference    intersect?    repeated_combination  take
  []             dig           intersection  repeated_permutation  take_while
  []=            drop          join          replace               to_a
  all?           drop_while    keep_if       reverse               to_ary
  any?           each          last          reverse!              to_h
  append         each_index    length        reverse_each          to_s
  assoc          empty?        map           rfind                 transpose
  at             eql?          map!          rindex                union
  bsearch        fetch         max           rotate                uniq
  bsearch_index  fetch_values  min           rotate!               uniq!
  clear          fill          minmax        sample                unshift
  collect        filter        none?         select                values_at
  collect!       filter!       one?          select!               zip
  combination    find          pack          shelljoin             |
  compact        find_index    permutation   shift
  compact!       first         pop           shuffle
  concat         flatten       prepend       shuffle!
  count          flatten!      pretty_print  size
```

There are a few methods that add a single element to the end an array. `<<`, `append`, and `push` are all aliases for each other. In earlier versions of ruby, shovel was preferred because it was the only way to add to an array and keep the same [object ID](https://ruby-doc.org/current/Object.html#method-i-object_id), the other methods all created a new object, which could cause some unpredictable behavior. In modern ruby versions these methods all do the same thing now, they "mutate" (change) the array in-place.

```pry
>> arr << 9
=> [4, 3, 0, 8, 1, 9]
```

The `concat` and `+=` methods add the elements of another array to the end.

```pry
>> arr += [3, 0, 5]
=> [4, 3, 0, 8, 1, 9, 3, 0, 5]
```

You can refer to individual elements by their index, starting at 0.

```pry
>> arr[0]
=> 4
>> arr[3]
=> 8
```

Ruby also let's you see elements by negative index, with -1 being the last element, -2 being the one before that, etc.

```pry
>> arr[-1]
=> 5
>> arr[-2]
=> 0
```

...which provides us a method to build an array of Fibonacci numbers: Fetch the last two digits, add them, then shovel the result into the array.

```pry
>> fib = [1, 2, 3, 5, 8]
=> [1, 2, 3, 5, 8]
>> fib << fib[-1] + fib[-2]
=> [1, 2, 3, 5, 8, 13]
```

So to sole the problem properly, we need to start at `[1, 2]`, then build the length out to ten elements, and then again until the next number would be over 4 million, then sum the even ones. This problem is fiddly enough that we should solve it in a ruby file instead of in pry. Type `exit` into pry or press ctrl-d, to get back to a command prompt.

Use your code editor to create a new file in the `~/dev/euler` folder, and call it `p2.rb`. When you want to test what it does, from the terminal type `ruby p2.rb`. Anything that is printed to the screen will be because you put it there with a `puts` ruby command.

Here's a simple script to get the array out to 10 digits, that _looks_ like it should work:

```ruby
fib = [1, 2]

def next_fib
  fib[-1] + fib[-2]
end

fib << next_fib until fib.length == 10

puts fib
```

But running it will produce an error.

```
euler # ruby p2.rb
p2.rb:4:in 'Object#next_fib': undefined local variable or method 'fib' for main (NameError)

  fib[-1] + fib[-2]
  ^^^
  from p2.rb:7:in '<main>'
euler #
```

Our `next_fib` method can't see the `fib` variable declared in the main program logic. This is a [variable scope](https://www.rubyguides.com/2019/03/ruby-scope-binding/) problem. Basically methods don't have access to any variables that aren't either in the method signature (the list of variables the method expects) or declared inside the method.

There are three variable types with more visibility, global, [class and instance](https://www.ruby-lang.org/en/documentation/faq/8/) variables, and constants. Global variable are variables that every piece of a program can see and mutate, and using them is a bad practice. For a simple script using a single global variable wouldn't be the end of the world. All we would need to do is replace `fib` with `$fib` everywhere. But we can do better.

`next_fib` shouldn't care about the rest of the program. It should accept any array passed to it, and not care what happens next. This is the single responsibility principle. There's a lot of comp-sci theory around SRP and "separation of concerns" that talks in terms of actors and modules, but in simpler terms a method should do one thing well. So let's give `next_fib` a signature.

```ruby
def next_fib arr
  arr[-1] + arr[-2]
end

fib = [1, 2]
fib << next_fib(fib) until fib.length == 10

puts fib
```

And the next run is error-free.

```
euler # ruby p2.rb
1
2
3
5
8
13
21
34
55
89
euler #
```

To get up to 4 million, we just change our condition a little, and have the condition create a variable we can reuse.

```ruby
def next_fib arr
  arr[-1] + arr[-2]
end

fib = [1, 2]

while (n = next_fib(fib)) < 4_000_000
  fib << n
end

puts fib
```

From here you can just select the even numbers and sum them and be done, but... I don't like the way this looks. This would look better if we could do it with functional programming somehow. Mutating an array in a loop like this is easy to get wrong, and creating a variable _inside_ a condition like that just looks clumsy.

A good tool to help us out here is an enumerator.  Enumerators are functions that yields one piece of information at a time back to the caller. It's what happens when you call `.each` on something. `each` yields one item of an array at a time to the code block you pass to it. You're familiar with using `.map` on arrays and ranges. Behind the scene `map` is calling `each` and collecting the results into the array it returns.

Here's an example of an `each` enumerator and how you can use it.

```pry
>> e = [4, 3, 0, 8, 1].each
=> #<Enumerator: ...>
>> e.next
=> 4
>> e.next
=> 3
>> e.next
=> 0
>> e.take(2)
=> [4, 3]
>> e.take_while { |i| i != 1 }
=> [4, 3, 0, 8]
```

Calling `.next` on an enumerator simply returns each element in sequence. `.take` always starts from the beginning, giving you the number of items you asked for, or the whole list if you ask for more than it has.

The one we want, though, is `.take_while`, which returns elements while a condition is true. We can simply ask `take_while` to return fibonacci numbers while the values are less than 4 million. First we're going to create a specific type of enumerator: a generator. Generators have no fixed list, they are just rules for generating the next number.

Change your code file to this:

```ruby
gen = Enumerator.new do |e|
  a = 1; b = 2
  loop do
    e << a
    a, b = b, a + b
  end
end

fib = gen.take_while { |i| i < 4_000_000 }
puts fib.select(&:even?)
```

`Enumerator.new` takes a block with a single variable that the docs call a "yielder", which I'm just calling "e" here. The variables declared in the block hold their values between calls, so all we need to do is hold onto the last two, and create one more during each call.

`loop do` is explicitly declaring an infinte loop. It works the same as `while(true)`. When we shovel a value into `e`, the value gets yielded back to the caller. The last bit of magic is:

```ruby
a, b = b, a + b
```

Ruby allows you to set multiple variables this way. The values on the right of the equals sign get evaluated, and only after that do the values get assigned. This lets us do the `a + b` part without anything going haywire.

Running that now should give you the same list, with only the even ones selected. And we didn't need to mutate an array or use an extra variable in the condition logic. Generators and yielding are hard concepts to get your head around. It took me a while to get used to them, but now to me this code reads a lot cleaner than the earlier version.

```
euler # ruby p2.rb
2
8
34
144
610
2584
10946
46368
196418
832040
3524578
euler #
```

Now just add up the numbers.

## Problem 3

> The prime factors of $13195$ are $5, 7, 13$ and $29$.
> What is the largest prime factor of the number $600851475143$?

We can find prime numbers with a loop like...

```ruby
primes = [2, 3]
(5..100).step(2).each { |c| primes << c if primes.all? { |p| (c % p) > 0 } }
```

Or we could write a Sieve of Eratosthenes, which is a lot faster. And then we could iterate over primes less than the square root of a number to find its factors... but we don't need to do any of that. Finding prime factors is a solved problem, and ruby has a built-in library for finding them.

```pry
>> require 'prime'
=> true
>> 13.prime?
=> true
>> 14.prime?
=> false
>> 13195.prime_division
=> [[5, 1], [7, 1], [13, 1], [29, 1]]
>> 13195.prime_division.map(&:first).max
=> 29
```

The output of `prime_division` is an array of arrays. The inner arrays are in the format [factor, power]. 25 is $5^2$, hence:

```pry
>> 25.prime_division
=> [[5, 2]]
```
So that's it, require the prime library, do prime division on the larger number from the problem, Bob's your uncle.

## Problem 4

> A palindromic number reads the same both ways. The largest palindrome made from the product of two $2$-digit numbers is $9009 = 91 \times 99$.
> Find the largest palindrome made from the product of two $3$-digit numbers.

Problems like this are where ruby really shines. First, it already knows how to reverse a string.

```pry
>> "FORD v FERRARI".reverse
=> "IRARREF v DROF"
```

Second, it already knows how to do basic combinatorics.

```pry
>> [2, 3, 4].combination(2).to_a
=> [[2, 3], [2, 4], [3, 4]]
>> [2, 3, 4].combination(2).map { |a, b| a * b }
=> [6, 8, 12]
```

The `|a, b|` business is a good example of ruby magic. What the block receives in each element of the outer array, each inner array of two elements. If I say `.map { |a| }` I'll receive `[2, 3]`, then `[2, 4]`, etc as `a` in each loop. If I `.map { |a, b| }`, the enumerator automatically splits up the inner array and assigns `a = 2; b = 3` for the first element. This saves you from writing a lot of imperative code to handle the mechanics of splitting up lists of lists.

So ruby is good at combining and splitting things, and reversing strings for us, but we do have to teach it how to recognize a palindromic number. We'll do this by casting the integer to a string, and asking if the string is the same as its reverse.

```ruby
def palindrome? n
  s = n.to_s
  s.reverse == s
end
```

```pry
>> def palindrome? n
>>   s = n.to_s
>>   s.reverse == s
>> end
=> :palindrome?
>> palindrome? 4114
=> true
>> palindrome? 4113
=> false
```

It's possible to add this directly to the Integer class, so it can be called with `4114.palindrome?` or passed into enumerators with `&:`, for example `products.select(&:palindrome)`. You simply open up the class and add to it.

```pry
>> class Integer
>>   def palindrome?
>>     s = to_s
>>     s.reverse == s
>>   end
>> end
=> :palindrome?
>> [4114, 4113].select(&:palindrome?)
=> [4114]
>>
```

Notice I didn't have to call `to_s` on anything. The instance itself is the default variable. If you need to reference it directly, like calling a method in another class, it's just called `self`.

Modifying somebody else's class in known as [Monkeypatching](https://en.wikipedia.org/wiki/Monkey_patch), and it's dangerous. David Hansson, creator of the Ruby on Rails framework and unmitigated asshole, wrote a blog entry [Provide sharp knives](https://signalvnoise.com/svn3/provide-sharp-knives/) where he argued in favor of monkeypatching, which rails certainly does a lot of.

I don't care for it, but it's there if you want it, and harmless for toy projects like solving puzzles.

Next we need to find all the products of two digit numbers, select the palindromes, and find the largest.

```pry
>> def palindrome? n
>>   s = n.to_s
>>   s.reverse == s
>> end
=> :palindrome?
>> (10..99).to_a.combination(2).map { |a, b| a * b }.select { |n| palindrome? n }.first(10)
=> [242, 363, 484, 616, 737, 858, 979, 1001, 252, 444]
```

`.first` does what you expect, and I used it because there were over 100 palindromes. We can swap that with `max` to verify the example from the problem.

```ruby
(10..99).to_a.combination(2).map { |a, b| a * b }.select { |n| palindrome? n }.max
```

```pry
>> (10..99).to_a.combination(2).map { |a, b| a * b }.select { |n| palindrome? n }.max
=> 9009
```

And to solve, just expand the range.

And hey, you could read that, couldn't you? If you've powered through to this part in one go, now's a great time to step away and grab yourself a fat piece of congratulatory cake.

## Problem 5

> 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
> What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

This is a good example of how a naive imperative solution will fail you at scale. The naive approach is to test the problem's claim as it is written. Start with candidate answer `c = 10`, take the modulus of `c % 1` through `c % 10`, then increment c until all the moduli are 0.

```pry
>> divisors = (1..10)
=> 1..10
>> (10..5000).find { |c| divisors.all? { |d| (c % d).zero? } }
=> 2520
```

You can call `.find` on a collection and it will return the first element where the block returns true. Calling `.all?` on the divisors will return true if each block in the collection returns true. in this case seeing if the numbers divide evenly. This is nice because it stops at the first failure instead of always going from 1 to 10.

Now if we expand the upper candidate range to 1 million, and the divisor range to 20, we'll see why this isn't a good approach.

```pry
>> divisors = (1..20)
=> 1..20
>> (20..1_000_000).find { |c| divisors.all? { |d| (c % d).zero? } }
=> nil
```

Nothing yet? How about 100 million?

```pry
>> (20..100_000_000).find { |c| divisors.all? { |d| (c % d).zero? } }
=> nil
>> require 'benchmark'
=> true
>> Benchmark.measure { (20..100_000_000).find { |c| divisors.all? { |d| (c % d).zero? } } }
=> #<Benchmark::Tms:0x0000000124e3ff10
 @cstime=0.0,
 @cutime=0.0,
 @label="",
 @real=25.90372099999513,
 @stime=0.06295300000000004,
 @total=25.903057000000004,
 @utime=25.840104000000004>
 ```

 At this scale a bad approach to a problem becomes very clear. Almost 26 second to again not find the solution, and this is on an M4 Macbook Air I bought last year.

 So what's a better approach? Combine the least common multiples of all the number pairs. We can ignore 1, so start with the LCM of 2 and 3. Naturally ruby has this an an integer built-in as well:

 ```pry
 >> 2.lcm 3
=> 6
```

The next number in the sequence is 4, so we want the LCM of 6, the old LCM, and 4.

```pry
>> 6.lcm 4
=> 12
```

...and continue on in the same fashion

```pry
>> 12.lcm 5
=> 60
>> 60.lcm 6
=> 60
>> # 60 is a multiple of 6
>> 60.lcm 7
=> 420
>> 420.lcm 8
=> 840
>> 840.lcm 9
=> 2520
```

And we can stop there. 2520 ends with a zero, so it evenly divides 10.

We can automate this with a reduce function. I think reduction functions come from the matrix math idea of vector reduction, reducing the dimensions of a matrix by one. Turn a grid into a list, turn a list into a single value. It's what we've been doing with `.sum` this whole time.

The actual `.reduce` method keeps an accumulator between each loop, and applies the block passed to it using the current accumulator, and the next element of the list, which is what we were doing manually above. By default the first accumulator is just the first element in the list, unless you expressly say otherwise.

So we can get to our 2520 with:

```ruby
(1..10).reduce { |acc, n| acc.lcm n }
```

```pry
>> (1..10).reduce { |acc, n| acc.lcm n }
=> 2520
```

And agin, ruby magic can handle the mechanics of that for us:

```ruby
(1..10).reduce(&:lcm)
```

```pry
>> (1..10).reduce(&:lcm)
=> 2520
```

I'm not going to show the answer from 1 to 20, but I do want to round it down to the last 100 million to show how long we would have waited for the naive solution to actually find an answer. You can do this with integer division, which returns an integer instead of a float.

```pry
>> (1..20).reduce(&:lcm) / 100_000_000
=> 2
```

So somewhere between 200 and 300 million. And with a better mathematical approach, we can get that pretty fast.

```pry
>> Benchmark.measure { (1..20).reduce(&:lcm) }
=> #<Benchmark::Tms:0x0000000124a90158
 @cstime=0.0,
 @cutime=0.0,
 @label="",
 @real=1.1999996786471456e-05,
 @stime=4.000000000115023e-06,
 @total=1.8000000000295557e-05,
 @utime=1.4000000000180535e-05>
 ```

 1e-6 seconds is a microsecond, so the "real" value at around 1.2e-5 is 12 microseconds, compared to what would have been over a minute using the naive solution.

 ## Problem 6

> The sum of the squares of the first ten natural numbers is,
>
> $$1^2 + 2^2 + ... + 10^2 = 385.$$
>
> The square of the sum of the first ten natural numbers is,
>
> $$(1 + 2 + ... + 10)^2 = 55^2 = 3025.$$
>
> Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is $3025 - 385 = 2640$.
>
> Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

Sound familiar? This is problem 0 with a twist. Instead of being the sum of odd squares, it's the sum of all squares, and as you'd expect there is an algebraic solution:

$$\sum _{i=1}^{n}i^{2}=\frac{n(n+1)(2n+1)}{6}$$

Now the _square_ of the _sum_ of the first n natural numbers is going to be larger, and of course it has a formula too. I knew neither of these, I just googled them.

$$\frac{n^{2}(n+1)^{2}}{4}$$

And since we have easier math methods already, we don't need to tease out the naive solution that loops over all the numbers. There's enough going on in this problem that we should turn this one into a script as well. In your editor, create p6.rb.

First lets turn those math formulae into ruby methods, and write a method to find their difference.

```ruby
def sum_of_squares n
  n * (n + 1) * (2 * n + 1) / 6
end

def square_of_sum n
  n ** 2 * (n + 1) ** 2 / 4
end

def delta n
  square_of_sum(n) - sum_of_squares(n)
end
```

We're going to pass in the "n" we want to use to the program as a command line argument. These are stored in the special variable `ARGV`. Variables that begin with an upper-case letter are constants, and ruby makes them visible to the entire script, class, or module that they're declared in. By convention constants are all upper-case, and by convention you shouldn't mutate them. But ruby provides sharp knives, so you _can_ mutate or reassign them. But don't.

ARGV is an array of all the command line arguments, and we only need the first. Add this to the script to see argument handling in action:

```ruby
puts ARGV[0]
```

And then run the script from a terminal window with an argument.

```
euler # ruby p6.rb 10
10
euler #
```

The argument will come into the script as a string, so we have to cast it to an integer before using it. So let's do that, and then call delta and see if it gives us the right answer. Make the entire script:

```ruby
def sum_of_squares n
  n * (n + 1) * (2 * n + 1) / 6
end

def square_of_sum n
  n ** 2 * (n + 1) ** 2 / 4
end

def delta n
  square_of_sum(n) - sum_of_squares(n)
end

n = ARGV[0].to_i
puts delta(n)
```

...and let's call it:

```
euler # ruby p6.rb 10
2640
euler #
```

Sure enough, 2640. Now just call it with the problem's real n.

## Problem 7

> By listing the first six prime numbers: $2, 3, 5, 7, 11$, and $13$, we can see that the $6$th prime is $13$.
> What is the $10\,001$st prime number?

In ruby, `Prime` inherits from Enumerable, so it has a `take` method like we used back in problem 2.

```ruby
require 'prime'
Prime.take(6).last # returns 13
```

```pry
>> require 'prime'
=> true
>> Prime.take 6
=> [2, 3, 5, 7, 11, 13]
>> Prime.take(6).last
=> 13
```

That's okay. Not every puzzle makes us put on our thinking caps.

## Problem 8

> The four adjacent digits in the $1000$-digit number that have the greatest product are $9 \times 9 \times 8 \times 9 = 5832$.
> 
> ```
> 73167176531330624919225119674426574742355349194934
> 96983520312774506326239578318016984801869478851843
> 85861560789112949495459501737958331952853208805511
> 12540698747158523863050715693290963295227443043557
> 66896648950445244523161731856403098711121722383113
> 62229893423380308135336276614282806444486645238749
> 30358907296290491560440772390713810515859307960866
> 70172427121883998797908792274921901699720888093776
> 65727333001053367881220235421809751254540594752243
> 52584907711670556013604839586446706324415722155397
> 53697817977846174064955149290862569321978468622482
> 83972241375657056057490261407972968652414535100474
> 82166370484403199890008895243450658541227588666881
> 16427171479924442928230863465674813919123162824586
> 17866458359124566529476545682848912883142607690042
> 24219022671055626321111109370544217506941658960408
> 07198403850962455444362981230987879927244284909188
> 84580156166097919133875499200524063689912560717606
> 05886116467109405077541002256983155200055935729725
> 71636269561882670428252483600823257530420752963450
> ```
> 
> Find the thirteen adjacent digits in the $1000$-digit number that have the greatest product. What is the value of this product?

One of the difficulties in this problem is getting that block of numbers into a a place where we can read and process it. You can cut and paste it out of here into a new file in your code editor, or you can right-click and save [p8input.txt](/euler-inputs/p8input.txt) here, and save it to or move it into your project directory.

Good file handling is crucial in writing software, so you need to get really good at managing save dialogs, know what folder your terminal is in, and where your project is stored. Here's a tip for save dialogs on a mac: cmd-shift-g, then just type in the path you want. `~` for your home directory works there, too.

Save the block of numbers as-is, the fact that it's on multiple lines isn't a big deal. Once you've got it in place, let's take a look at some of the ways we can read it in.

```pry
>> File.read 'p8input.txt'
=> "73167176531330624919225119674426574742355349194934\n96983520312774506326239578318016984801869478851843\n85861560789112949495459501737958331952853208805511\n12540698747158523863050715693290963295227443043557\n66896648950445244523161731856403098711121722383113\n62229893423380308135336276614282806444486645238749\n30358907296290491560440772390713810515859307960866\n70172427121883998797908792274921901699720888093776\n65727333001053367881220235421809751254540594752243\n52584907711670556013604839586446706324415722155397\n53697817977846174064955149290862569321978468622482\n83972241375657056057490261407972968652414535100474\n82166370484403199890008895243450658541227588666881\n16427171479924442928230863465674813919123162824586\n17866458359124566529476545682848912883142607690042\n24219022671055626321111109370544217506941658960408\n07198403850962455444362981230987879927244284909188\n84580156166097919133875499200524063689912560717606\n05886116467109405077541002256983155200055935729725\n71636269561882670428252483600823257530420752963450\n"
```

`File.read` will read the whole file in as a single string. In the perl community we call this "slurping" a file. From here we can assign the string to a variable, and then get rid of the newlines.

```pry
>> input = File.read('p8input.txt').delete "\n"
=> "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"
>> input.length
=> 1000
```

In this case, each line is part of a larger whole. If each line was meaningful on its own, an alternate approach is to read the file in as an array of lines.

```pry
>> File.readlines('p8input.txt')
=> ["73167176531330624919225119674426574742355349194934\n",
 "96983520312774506326239578318016984801869478851843\n",
 "85861560789112949495459501737958331952853208805511\n",
 "12540698747158523863050715693290963295227443043557\n",
 "66896648950445244523161731856403098711121722383113\n",
 "62229893423380308135336276614282806444486645238749\n",
 "30358907296290491560440772390713810515859307960866\n",
 "70172427121883998797908792274921901699720888093776\n",
 "65727333001053367881220235421809751254540594752243\n",
 "52584907711670556013604839586446706324415722155397\n",
 "53697817977846174064955149290862569321978468622482\n",
 "83972241375657056057490261407972968652414535100474\n",
 "82166370484403199890008895243450658541227588666881\n",
 "16427171479924442928230863465674813919123162824586\n",
 "17866458359124566529476545682848912883142607690042\n",
 "24219022671055626321111109370544217506941658960408\n",
 "07198403850962455444362981230987879927244284909188\n",
 "84580156166097919133875499200524063689912560717606\n",
 "05886116467109405077541002256983155200055935729725\n",
 "71636269561882670428252483600823257530420752963450\n"]
```

`readlines` takes an optional [keyword argument](https://docs.ruby-lang.org/en/4.0/syntax/calling_methods_rdoc.html#label-Keyword+Arguments) (a separate set of named arguments that you send after the positional ones) "chomp" that will take care of the newlines for you.

```pry
>> File.readlines('p8input.txt', chomp: true)
=> ["73167176531330624919225119674426574742355349194934",
 "96983520312774506326239578318016984801869478851843",
 "85861560789112949495459501737958331952853208805511",
 "12540698747158523863050715693290963295227443043557",
 "66896648950445244523161731856403098711121722383113",
 "62229893423380308135336276614282806444486645238749",
 "30358907296290491560440772390713810515859307960866",
 "70172427121883998797908792274921901699720888093776",
 "65727333001053367881220235421809751254540594752243",
 "52584907711670556013604839586446706324415722155397",
 "53697817977846174064955149290862569321978468622482",
 "83972241375657056057490261407972968652414535100474",
 "82166370484403199890008895243450658541227588666881",
 "16427171479924442928230863465674813919123162824586",
 "17866458359124566529476545682848912883142607690042",
 "24219022671055626321111109370544217506941658960408",
 "07198403850962455444362981230987879927244284909188",
 "84580156166097919133875499200524063689912560717606",
 "05886116467109405077541002256983155200055935729725",
 "71636269561882670428252483600823257530420752963450"]
 ```

 But for our purposes, `File.read` is better. The next thing we want to do is turn the string into an array of integers. Strings have a method `.chars` that creates an array of each character, and from there we can map them over `to_i`.

 ```pry
 >> input = File.read('p8input.txt').delete("\n")
=> "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"
>> input.chars.first 15
=> ["7", "3", "1", "6", "7", "1", "7", "6", "5", "3", "1", "3", "3", "0", "6"]
>> input.chars.map(&:to_i).first 15
=> [7, 3, 1, 6, 7, 1, 7, 6, 5, 3, 1, 3, 3, 0, 6]
```

We'll be grouping numbers into sequential sets of 4 (and then 13) digits and multiplying them all together. Notice the second to last number is a zero? It will save us a lot of CPU cycles if we don't bother with groups of numbers that have a zero in them. Keep that in the back of your head for now.

Ruby has two array methods to create groups of sequential numbers, `each_cons` and `each_slice`, and they behave slightly differently.

```pry
>> [1, 2, 3, 4, 5, 6, 7, 8].each_cons(4).to_a
=> [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7], [5, 6, 7, 8]]
>> [1, 2, 3, 4, 5, 6, 7, 8].each_slice(4).to_a
=> [[1, 2, 3, 4], [5, 6, 7, 8]]
```

`each_cons` is the one we want, since we need to just advance the index by one to get each possible collection of 4 numbers. I don't know the origin of why "cons" is in the method name. It might just mean consecutive, or it might be a refence to the [lisp cons](https://en.wikibooks.org/wiki/Common_Lisp/Reference/cons) construct.

From there we need to use reduce to create the products, then find the biggest one.

```pry
>> [1, 2, 3, 4, 5, 6, 7, 8].each_cons(4).map { |group| group.reduce { |acc, n| acc * n } }
=> [24, 120, 360, 840, 1680]
>> [1, 2, 3, 4, 5, 6, 7, 8].each_cons(4).map { |group| group.reduce { |acc, n| acc * n } }.max
=> 1680
```

There's a syntax sugar version of reducing by a math expression, just put `:` before the operator.

```pry
>> [1, 2, 3, 4, 5, 6, 7, 8].each_cons(4).map { |g| g.reduce(:*) }.max
=> 1680
```

Now create p8.rb and let's put everything together.

```ruby
input = File.read('p8input.txt').delete("\n")
nums = input.chars.map(&:to_i);
puts nums.each_cons(4).map { |g| g.reduce(:*) }.max
```

And just run that to get the solution to the problem's example.

```
euler # ruby p8.rb
5832
euler #
```

Now, back to our "0" issue. Even at groups of 13, you'd have to use `Benchmark` to see the speed difference, but we shouldn't do any multiplication on groups that have a 0 in them.

```ruby
input = File.read('p8input.txt').delete("\n")
nums = input.chars.map(&:to_i);
groups = nums.each_cons(4).reject { |g| g.any? { |n| n.zero? } }
puts groups.map { |g| g.reduce(:*) }.max
```

`reject` is the opposite of `select`, anything that matches the condition is not included in the list `reject` returns. `any?` is like `all?`, but it returns true if any element in the list passes the condition.

And to get your solution, just swap 4 for 13.

## Problem 9

> A Pythagorean triplet is a set of three natural numbers, $a \lt b \lt c$, for which,
> 
> $$a^2 + b^2 = c^2.$$
> 
> For example, $3^2 + 4^2 = 9 + 16 = 25 = 5^2$.
> 
> There exists exactly one Pythagorean triplet for which $a + b + c = 1000$.
> 
> Find the product $abc$.

This is a well known math problem, and you can find the triplet in question with a simple Google search for "pythagorean triplet that sums to 1000". So because the solution is already widely available, this will be the exception that proves the rule, and I won't shy away from showing the actual triplet here.

I'm sure you remember the Pythagorean theorem $a^2 + b^2 = c^2.$ from school, for finding the hypotenuse of a right triangle. Pythagorean triples are solutions to that equation where all the lengths are whole numbers.

The naive solution in ruby isn't all that bad. $a$ and $b$ can be pulled from `combination(2)` of the range `1..1000`, find $c$ with arithmetic, then find the first valid triple:

```pry
>> (1..1000).to_a.combination(2).find do |a, b|
>>   c = 1000 - (a + b)
>>   a ** 2 + b ** 2 == c ** 2
>> end
=> [200, 375]
```

And then recalculate c, find `a * b * c` to get the problem's solution, and we're done. Technically this approach is wrong since half of the Cs will be negative, but it happens to give the right answer. We can doctor up that approach and make it safer, but like some of these problems, a better pure math solution already exists. There is a generator for Pythagorean triples that was introduced in Eulid's Elements. Sort of. It appears as a lemma, so we can assume it was proven before Euclid's time, and it talks about bisecting line segments and such, but the core concept is in there.

Basically if you have two positive integers, m and n that are coprime to each other, where $m > n$, you can generate a Pythagorean triple $a, b, c$ with:

$$a=m^{2}-n^{2}, b=2mn, c=m^{2}+n^{2}$$

To find the right generator, we don't need the individual a, b, and c, just their sum, so we can simplify the generator equations.

$$m^{2}-n^{2}+2mn+m^{2}+n^{2} = 2m^2 + 2mn$$

```pry
>> n, m = (1..100).to_a.combination(2).find { |n, m| 2 * m ** 2 + 2 * m * n == 1000  }
=> [5, 20]
>> a, b, c = m ** 2 - n ** 2, 2 * m * n, m ** 2 + n ** 2
=> [375, 200, 425]
>> a + b + c
=> 1000
>> a ** 2 + b ** 2 == c ** 2
=> true
```

Notice my ordering of n and m here. Ruby outputs combinations with the smaller number first.

That shows that this method works, now let's turn that into a script that's a little more readable. Put this into p9.rb:

```ruby
def gen(m, n)
  [m ** 2 - n ** 2, 2 * m * n, m ** 2 + n ** 2]
end

a, b, c = (1..100).to_a.combination(2)
  .map { |n, m| gen(m, n) }
  .find { |arr| arr.sum == 1000 }

puts a, b, c
```

In ruby files you can chain methods together on separate lines to make things easier to read.

Running this produces:

```
euler # ruby p9.rb
375
200
425
euler #
```

And to get the problem's solution, just multiply those together.
