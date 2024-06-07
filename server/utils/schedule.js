const fs = require('fs');
const csv = require('csv-parser');
const { writeLog } = require('./logs');

CSVPATH = 'public/csv/agenda.csv';

exports.readCSVFile = async () => {
    return new Promise((resolve, reject) => {
        const dataArray = [];
        fs.createReadStream(CSVPATH)
            .pipe(csv())
            .on('data', (row) => {
                dataArray.push(row);
            })
            .on('end', () => {
                writeLog('INFO', 'CSV file read successfully');
                resolve(dataArray);
            })
            .on('error', (error) => {
                console.log(error);
		writeLog("SERVER", "ERROR reading CSV file, might not be well structured");
		reject([]);
            });
    });
}

