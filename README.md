# Password Not Accepted
WORK IN PROGRESS
Making passwords should be easy, right? Except it's not. I was inspired to make this after being prompted to make a password by a site that had various inane requirements that did not really help me ensure my account would be kept [safe.](https://pages.nist.gov/800-63-3/sp800-63b.html#sec5) See if you can successfully make a password...

**Link to project:** https://clara-ra.github.io/password-not-accepted/

![alt tag](https://github.com/Clara-ra/password-not-accepted/blob/main/screenshot.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

I thought it would be overkill to use anything more complex than vanilla javascript. The content itself is very minimal, as it simply provides an input for the user to type in. The javascript uses a series of regular expressions, with increasing complexity to ensure the user is meeting all the rules. I have future plans to create a database to verify that the accepted password has not been used before. I also plan to add several more rules, as I think it is still too easy.

## Lessons Learned:

Regular Expressions are a fantastic tool for looking for various characters. Before this project I had no idea what a capturing group was, let alone how to form a simple regex beyond checking for letters.

All characters have a numerical representation. One of the more popular standards is Unicode, as it has a comprehensive list including international languages. In Unicode, this numerical representation is called a Code point. Originally, the range of code points was 16 bits. This was enough to represent all the characters needed for the English Alphabet. 
Standard engish characters such as 'A' or '!' Have an address that can be represented with less than 16 bits. However, the Unicode Consortium ( the nonprofit that maintains Unicode ) decided that this wasn't enough. They substantially expanded the range of addresses to 17 planes (sometimes called the Astral plane), where each plane adds an additional 16 bits. The english languages lives in what is called the Basic Multilingual Plane (BMP). The next plane up is called the Supplementary Multilingual Plane, and this is where most Emojis live.

However, this complicates things a bit in Javascript. In Javascript, if you were to check the length of 1 emoji, in most cases you'd get back a length of 2. This is because in Javascript, a string is a sequence of 16-bit code points. Since emojis are commonly made up of more than 16bits, the code point is split up into a pair of code points called the lead surrogate and tail surrogate. 
To get the lead surrogate and the tail surrogate, you subtract 0x10000 (the range of BMP) from the code point. Then, for the lead surrogate add 0xD800 and grab the 10 most significant bits. For the tail surrogate, you add 0xDC00 to the 10 least significant bits. 
You can use this hex pair to perform some Regex. 

Additionally, there is a category of emojis that can be modified that have a different skin tone. This is represented by prepending the emoji to 1 of 6 fitzpatrick skin types. Skin types have Code points that live in the SMP, which means that to use them the lead and tail surrogates must be calculated as well. 

## Relevant XKCD:
https://xkcd.com/936/
