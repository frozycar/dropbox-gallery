const fs = require('fs');
const path = require('path');

const writeLog = (type, message) => {
    const fileName = checkIfFileExists();
    const time = new Date().toLocaleTimeString();
    fs.appendFileSync(fileName, `${time}\t[${type}]\t${message}\n`);
};


const checkIfFileExists = () => {
    // Get the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0').toString();
    const day = String(currentDate.getDate()).padStart(2, '0').toString();

    // Create the log directory if it doesn't exist
    const logDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    // Create the log file with the current date as the filename
    const logFileName = `${year}/${month}/${day}.log`;

    const logFilePath = path.join(logDir, logFileName);

    // Check if the log file already exists
    if (!fs.existsSync(logFilePath)) {
        // Create the year directory if it doesn't exist
        const yearDir = path.join(logDir, year);
        if (!fs.existsSync(yearDir)) {
            fs.mkdirSync(yearDir);
        }
        // Create the month directory if it doesn't exist
        const monthDir = path.join(yearDir, month);
        if (!fs.existsSync(monthDir)) {
            fs.mkdirSync(monthDir);
        }
        fs.appendFileSync(logFilePath, '');
        writeLog('INFO', `Created log file: ${logFileName}`);
    }

    return logFilePath;
}

module.exports = { writeLog };