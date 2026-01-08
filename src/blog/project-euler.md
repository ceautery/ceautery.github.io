---
title: "Project Euler as an introduction to programming in Ruby"
description: "Project Euler as an introduction to programming in Ruby"
date: "2026-01-04"
hasMath: true
---

# Project Euler as an intro to programming in Ruby

|                                              |                                    |
| -------------------------------------------- | ---------------------------------- |
| <a href="#who-am-i">Who am I?</a>            | <a href="#problem-0">Problem 0</a> |
| <a href="#why-ruby">Why Ruby?</a>            | <a href="#problem-1">Problem 1</a> |
| <a href="#who-are-you">Who are you?</a>      | <a href="#problem-2">Problem 2</a> |
| <a href="#getting-set-up">Getting set up</a> | <a href="#problem-3">Problem 3</a> |
| <a href="#project-euler">Project Euler</a>   | <a href="#problem-4">Problem 4</a> |


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

The "use" line will create a `mise.toml` file to tell mise which installed version of ruby to use in that directory. You can type `ls` to see that the file is there (or `dir` if you're on Windows). The next two commands will create `Gemfile`, and add the "pry" gem to it. Pry is a "REPL" (Read, Eval, Print, Loop) which does just what it sounds like. It reads the ruby statements you enter, evaluates them (runs them), prints what they return, and does all of that in a loop until you type `exit` or press ctrl-d.

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

This method exposes some more of the mechanics behind writing to a file. We're opening a file in "write" mode, serving a [file handle](https://en.wikipedia.org/wiki/File_descriptor) (`f`) to the block, and the block "shovels" (`<<`) a [string](https://en.wikipedia.org/wiki/String_(computer_science)) to the file handle. Shoveling is a rubyism for adding to something. You shovel to write to a file, shovel to append to an array, and shovel to concatenate a string.

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

Using `2.0` instead of `2` for the division makes ruby treat the numbers to be floating point numbers instead of integers. More on that later. And yes, just like you can call `odd?` on a number, you can call `.zero?` on it to see if it's a zero. That does the same as `n == 0`.

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

To define a method, start with `def`, give the method a name (`snake_case` is a convention for naming variables and methods in ruby), and a "signature", or the variables it expects. We just have one variable, so we don't need to wrap it in anything special. We'll get into what to do with more complicated signatures later.

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

First, since I'm a lunatic and wrote this just as one long page, I suggest you use the table of contents to navigate. This will also help keep track of your progress, since links you've visited from there should be in a different color.

And good news! You learned enough about the ruby language in problem 0 to make the rest of the problems easier. We'll still cover some new concepts in each problem, but it will be less of a firehose.

After you register, and each time you sign in, you should be taking to the Archives link, where you can see the names of the first 50 problems. If not, you can navigate directly to each problem by it's number with the web address format:

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

There are a few methods that add to an array. `<<`, `append`, and `push` are all aliases for each other. In earlier versions of ruby, shovel was preferred because it was the only way to add to an array and keep the same [object ID](https://ruby-doc.org/current/Object.html#method-i-object_id), the other methods all created a new object, which could cause some unpredictable behavior. In modern ruby versions these methods all do the same thing now, they "mutate" (change) the array in-place.


## Problem 3
## Problem 4