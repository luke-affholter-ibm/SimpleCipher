from encrypt import simpleEncrypt
from decrypt import simpleDecrypt

plaintext = "This is an alphanumeric sentence, with some numbers 8521 and punctuation!"
key1 = "secret"
key2 = "privatekey"
key3 = "dontlook"
result1 =""
result2 =""
result3 =""
result4 = ""
result5 = ""
result6 = ""

print("\n" + "\n")
print("[--Running Simple Encryption test--]\n")
print("Plaintext: " + plaintext)
print("Key: " + key1)
result1 = simpleEncrypt(plaintext, key1)
print("\n" + "Result:" + "\n" + result1 + "\n")
print("[----------Test complete----------]")

print("\n")
print("[--Running Simple Decryption test--]\n")
print("Plaintext: " + result1)
print("Key: " + key1)
result2 = simpleDecrypt(result1, key1)
print("\n" + "Result:" + "\n" + result2 + "\n")
print("[----------Test complete----------]")

print("\n" + "\n")
print("[[[--Triple Nested Encryption test--]]]\n")
print("Plaintext: " + plaintext)
print("Keys: " + key1 + ", " + key2 + ", " + key3 + "\n")
result1 = simpleEncrypt(plaintext, key1)
print("1st pass: " + result1 + "\n")
result2 = simpleEncrypt(result1, key2)
print("2nd pass: " + result2 + "\n")
result3 = simpleEncrypt(result2, key3)
print("3rd pass: " + result3 + "\n")
print("[[[----------Test complete----------]]]")

print("\n")
print("[[[--Triple Nested Decryption test--]]]\n")
print("Plaintext: " + result3)
print("Keys: " + key1 + ", " + key2 + ", " + key3 + "\n")
result4 = simpleDecrypt(result3, key3)
print("1st pass: " + result4 + "\n")
result5 = simpleDecrypt(result4, key1)
print("2nd pass: " + result5 + "\n")
result6 = simpleDecrypt(result5, key2)
print("3rd pass: " + result6 + "\n")
print("[[[----------Test complete----------]]]")
