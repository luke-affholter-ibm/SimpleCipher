import sqlite3
import logging

database_path = "SQLite/ciphers.db"
logging.basicConfig(filename='dbOps.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Function to clear all entries in the database but retain the structure
def clearEntries():
    try:
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM strings")
        connection.commit()
        print("All entries cleared from the database.")
    except sqlite3.Error as e:
        print(f"Error clearing entries from the database: {e}")
    finally:
        if connection:
            connection.close()

# Function to reset entries by running clearEntries and inserting a preset array of strings
def resetEntries():
    clearEntries()
    
#    preset_strings = [
#        "We're no strangers to love", "You know the rules and so do I (do I)", "A full commitment's what I'm thinking of", "You wouldn't get this from any other guy", "I just wanna tell you how I'm feeling",
#        "Gotta make you understand", "Never gonna give you up", "Never gonna let you down", "Never gonna run around and desert you", "Never gonna make you cry"
#    ]
    
    preset_strings = ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5", "Value 6", "Value 7", "Value 8", "Value 9", "Value 10"]

    connection = sqlite3.connect(database_path)
    cursor = connection.cursor()

    # Create table if it cannot be found
    cursor.execute('''CREATE TABLE IF NOT EXISTS strings (id INTEGER PRIMARY KEY, value TEXT)''')

    try:
        for string in preset_strings:
            cursor.execute("INSERT INTO strings (value) VALUES (?)", (string,))
            connection.commit()
            print("Database strings have been reset.")
    except sqlite3.Error as e:
        print(f"Error inserting strings into the database: {e}")
    finally:
        connection.close()


# Function to insert an entry into the database (index 0-10)
def insertEntry(input_string):
    logging.info(f"Enter insertEntry function.")
    try:
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()
        cursor.execute("INSERT INTO strings (value) VALUES (?)", (input_string))
        connection.commit()
        print(f"Entry {input_string} added to the database.")
        logging.info(f"Entry '{input_string}' added to the database.")
    except sqlite3.Error as e:
        print(f"Error inserting entry into the database: {e}")
        logging.error(f"Error inserting entry into the database: {e}")
    finally:
        if connection:
            connection.close()

# Update a string given an index
def updateEntry(input_string, index):
    try:
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()
        if 1 <= index <= 10:
            cursor.execute("UPDATE strings SET value = ? WHERE id = ?", (input_string, index))
            connection.commit()
            print(f"Entry at index {index} updated in the database.")
        else:
            print("Invalid index. Index should be between 0 and 10.")
    except sqlite3.Error as e:
        print(f"Error inserting entry into the database: {e}")
    finally:
        if connection:
            connection.close()

# Retrieve strings from the database, then return as an array
def getStrings(database_path):
    try:
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()

        cursor.execute("SELECT text FROM strings")
        rows = cursor.fetchall()

        string_list = [row[0] for row in rows]

        return string_list

    except sqlite3.Error as e:
        print(f"Error retrieving strings from the database: {e}")
    finally:
        if connection:
            connection.close()

