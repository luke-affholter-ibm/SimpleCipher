// Webpage handler

// Submit button
function submitClick() {
    const inputMessage = document.getElementById("messageInput").value;
    if (inputMessage) {
        // Add message to database
        const debug = document.getElementById("debug");
        debug.textContent = "Submit click"
        addString(inputMessage);
        document.getElementById("messageInput").value = "";
        updateEntries();
    }
}

// Reset button
function resetClick() {
    // Clear textbox and reset message entries to default values
    document.getElementById("messageInput").value = "";
    resetEntries();
    updateEntries();
}

// Clear button
function clearClick() {
    // Clear the main input textbox and wipe all message entries
    document.getElementById("messageInput").value = "";
    clearEntries();
    updateEntries();
}

// Encrypt Button
function encryptClick() {
    const entryDropdown = document.getElementById('entryDropdown');
    const selectedEntry = parseInt(entryDropdown.value, 10)
    const arrayIndex = (selectedEntry - 1);
    const cipherKey = document.getElementById('cipherKey').value;
    const availableEntries = getEntries();
    const encryptResult = encryptEntry(availableEntries[arrayIndex], cipherKey)

    updateString(encryptResult, arrayIndex);
    updateEntries();
}

// Decrypt Button
function decryptClick() {
    const entryDropdown = document.getElementById('entryDropdown');
    const selectedEntry = parseInt(entryDropdown.value, 10)
    const arrayIndex = (selectedEntry - 1);
    const cipherKey = document.getElementById('cipherKey').value;
    const availableEntries = getEntries();
    const decryptResult = decryptEntry(availableEntries[arrayIndex], cipherKey)

    updateString(decryptResult, arrayIndex);
    updateEntries();
}

// Function to populate the entryList with available entries. Empty entries will be empty strings.
function updateEntries() {
    const displayArray = ["test", "", "", "", "", "", "", "", "", ""];
    const entryArray = getEntries();

    for (let i = 0; i < entryArray.length; i++) {
        if (entryArray[i] !== undefined) {
            displayArray[i] += entryArray[i];
        }
    }

    // Set each entry value according to the array
    const entry1 = document.getElementById('entry1');
    const entry2 = document.getElementById('entry2');
    const entry3 = document.getElementById('entry3');
    const entry4 = document.getElementById('entry4');
    const entry5 = document.getElementById('entry5');
    const entry6 = document.getElementById('entry6');
    const entry7 = document.getElementById('entry7');
    const entry8 = document.getElementById('entry8');
    const entry9 = document.getElementById('entry9');
    const entry10 = document.getElementById('entry10');

    entry1.textContent = displayArray[0];
    entry2.textContent = displayArray[1];
    entry3.textContent = displayArray[2];
    entry4.textContent = displayArray[3];
    entry5.textContent = displayArray[4];
    entry6.textContent = displayArray[5];
    entry7.textContent = displayArray[6];
    entry8.textContent = displayArray[7];
    entry9.textContent = displayArray[8];
    entry10.textContent = displayArray[9];
}

// Call the function to display entries
updateEntries();

// Server handler + database operations

/*
const { exec } = require('child_process');
const dbOpsPath = 'dbOps.py';
const encryptPath = 'encrypt.py';
const decryptPath = 'decrypt.py';
*/

// Add entry to database
function addString(text) {

    /*
    const debug = document.getElementById("debug");
    debug.textContent = "Enter addString " + text;

    const { exec } = require('child_process');
    const dbOpsPath = 'dbOps.py';
    const functionName = 'insertEntry';
    let functionOut = "";
    exec(`python ${dbOpsPath} --function ${functionName} --arg1 ${text}`, error, stdout, stderr) => { 
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }

        functionOut = stdout;
        console.log(`Python Output: ${functionOutput}`);
        debug.textContent = text + " added to the database. " + functionOut;
    };


    // /*
    const debug = document.getElementById("debug");
    debug.textContent = "addString " + text;
//    debug.textContent = "uh oh" + (spawn('python', ['dbOps.py', 'insertEntry', text]));
    const pythonProcess = spawn('python', ['dbOps.py', 'insertEntry', text]);
    debug.textContent = "addString " + text;

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        debug.textContent = text + " added to the database";
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
        debug.textContent = "Error encountered";
    });
    */
}

// Add entry to database
function updateString(text, index) {
    const pythonProcess = spawn('python', ['dbOps.py', 'updateEntry', text, index]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });
}

// Retrieve database entries
function getEntries() {
    // Initiate child process
    const pythonProcess = spawn('python', ['dbOps.py', 'get_strings']);
    let stringList = [""]

    // Handle Python output
    pythonProcess.stdout.on('data', (data) => {
        stringList = JSON.parse(data);
        console.log(stringList);
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });

    return stringList;
}

// Reset database entries to default
function resetEntries() {
    const pythonProcess = spawn('python', ['dbOps.py', 'resetEntries']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });
}

// Clear all database entries
function clearEntries() {
    const pythonProcess = spawn('python', ['dbOps.py', 'clearEntries']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });
}

// Encrypt an entry
function encryptEntry(text) {
    try {
        const pythonProcess = spawnSync('python', ['encrypt.py', text]);

        if (pythonProcess.error) {
            console.error('Error:', pythonProcess.error);
            return null;
        }

        if (pythonProcess.status === 0) {
            return pythonProcess.stdout.toString();
        } else {
            console.error('Encryption process exited with an error.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Decrypt an entry
function decryptEntry(text) {
    try {
        const pythonProcess = spawnSync('python', ['decrypt.py', text]);

        if (pythonProcess.error) {
            console.error('Error:', pythonProcess.error);
            return null;
        }

        if (pythonProcess.status === 0) {
            return pythonProcess.stdout.toString();
        } else {
            console.error('Encryption process exited with an error.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}