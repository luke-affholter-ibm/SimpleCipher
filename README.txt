README

Project objective: 
Create an algorithm within Python that would encrypt a user's message using a key phrase
by shifting letters in an alternating pattern that would (theoretically) only be 
deciphered by using the same key phrase.

For the purpose of this project, messages can be alphanumeric with punctuation/symbols,
and keys can only be lowercase alphabetic.

Encryption method:

Each character's unicode characters would be compared to determine the distance of the shift.
Overflowing would loop back to the beginning of the alphabet or number sequence.
Punctuation was left untouched, letters stay letters, numbers stay numbers.

Letter A in the key would signal a shift of zero, a thus letter J would signal a shift of 9.
So letter B encrypted with letter F would be B + (5), resulting in letter G.
Letter X encrypted with letter E would be X + (4), resulting in letter B.
Number 8 encrypted with letter Z would be 8 + 25 = 33 --- we want the 1s place, or the remainder
of 33 mod 10. So 8 becomes 3.

The decryption method works in the reverse direction, shifting letters and numbers backward.

Due to the nature of this encryption method, encryptions can be nested losslessly,
meaning you can encrypt a message, then encrypt its cipher, and even encrypt the new cipher - 
your message will be triple scrambled, but as long as you use the same keys, you can untangle
the message back to its original form.

You don't even have to use the keys in the same order. The shifts are compounded additively, so
reversing it simply means each character has to be shifted back the same total amount.
6+3+14 = 23, you can still get back to zero by 0 = 23 - 3 - 6 - 14.

This encryption method has flaws, the right combination of different keys equaling the same
numbers to shift could decipher the message. But remember that each letter of the original message
gets shifted a different amount than its neighbors. It isn't the "entire" message that gets
shifted a static amount. Each letter is shifted with its own unique combination.



How the project pieces fit together:
I have 3 microservices set up. One encrypts messages, one decrypts messages, and another
handles database operations from the webpage handler.
There is a webpage, its javascript handler that defines the webpages functions, and a
simple SQLite3 database that stores strings.

Messages can be inserted into the Database via the webpage (html). Available database entries are
displayed, and you can select one to modify with a keyphrase, and method (encrypt, decrypt)
Messages are updated to their new cipher forms after they've been modified.
For this proof of concept I allowed up to 10 entries to display.

The webpage handler holds functions that run when buttons are clicked, taking values from the
relevant fields, and performing operations using the values as arguments.

Message box: Enter a message you want to add to the database
Submit: Inserts a given message from the input box into the database
Reset: Clears all entries and fills in preset messages
Clear: Clears all entries, leaving the database empty (structure intact)
Dropdown: to select which entry you want to modify
Key phrase box: Enter the key you want to use to encrypt your message
Encrypt: Runs the encrypt.py script to encrypt your message
Decrypt: Runs the decrypt.py script to encrypt your message

Whenever an operation interacts with the database, it passes its information to the dbOps.py file
which handles the database queries.

So we have an html webpage, handled by a javascript server, that calls python functions to modify
messages and interact with the database.



What works:
Encryption and decryption methods work, database operations run successfully.
Webpage interacts with the server and performs simple button operations.

What doesn't and why:
The javascript server doesn't seem to communicate with the dbOps python script with my
configuration. I tried a few methods, but every time the workflow goes to call my python scripts
it stops. I've tried using a debug log on both the server and the python scripts, but the
debugger and log tools wouldn't write to logs. My last resort print statement tracing shows
the code gets to the python script execution statements, but goes radio silent after that.
It spat out no errors, wrote no log statements. I got stuck here.

To my best knowledge, I think I'm just executing the javascript to python script call incorrectly,
though it seems like it's a common problem, and so far the best solution I had doesn't compile.
My IDE believes it's missing a semicolon in the middle of my execute statement. From what I can
tell it's caused by an old TypeScript version, but I left off having trouble getting it to use a
newer version, so I'm not even sure that's the issue.


Show the website, type and Clear, type and Reset, type and Submit. Show dropdown.
Show encrypt test script.

