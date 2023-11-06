def simpleEncrypt(input_text, input_key):
    encrypted_text = []
    key_length = len(input_key)
    key_cursor = 0

    for char in input_text:
        shift = 0
        if input_key[key_cursor].isupper():
            shift = ord(input_key[key_cursor]) - ord('A')
        else:
            shift = ord(input_key[key_cursor]) - ord('a')

        if char.isalpha():
            uppercase_check = char.isupper()
            shifted_char = ord(char) + shift

            if uppercase_check:
                if shifted_char > ord('Z'):
                    shifted_char -= 26
                elif shifted_char < ord('A'):
                    shifted_char += 26

            else:
                if shifted_char > ord('z'):
                    shifted_char -= 26
                elif shifted_char < ord('a'):
                    shifted_char += 26

            encrypted_text.append(chr(shifted_char))
            key_cursor = (key_cursor + 1) % key_length

        elif char.isnumeric():
            shift = shift % 10
            shifted_char = ord(char) + shift

            if shifted_char > ord('9'):
                shifted_char -= 10
            elif shifted_char < ord('0'):
                shifted_char += 10

            encrypted_text.append(chr(shifted_char))
            key_cursor = (key_cursor + 1) % key_length
        else:
            encrypted_text.append(char)

    return ''.join(encrypted_text)

