const express = require('express');
const colors = require('colors');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { readCSVFile } = require('./utils/schedule');
const { createCarsSlide } = require('./utils/slides');
const { recursiveFileSearch, DROPBOX_PATH } = require('./utils/files');
const { writeLog } = require('./utils/logs');

const DIRECTORY_PATH = 'public/cars';
const WHITELIST = ['http://localhost:5173']
const FETCH_DROPBOX_FILES_TIMER = 30 * 60 * 1000; // 30 minutes

const app = express();

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (WHITELIST.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/images', cors(corsOptionsDelegate), (req, res) => {
    fs.readdir(DIRECTORY_PATH, async (err, files) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
            writeLog('ERROR', 'Internal Server Error: Unable to read directory contents');
            return;
        }

        //const timetable = await readCSVFile();
	let timetable = [];
        try {
                timetable = await readCSVFile();
        } catch (error) {
                console.log(error);
                writeLog("SERVER", "ERROR while getting all the images from the path");
        }

        const imageUrls = files
            .filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png')
            .map(file => `http://localhost:3000/images/${file}`); // Replace with the appropriate base URL

        res.statusCode = 200;

        res.setHeader('Content-Type', 'application/json');

        const cars = createCarsSlide(imageUrls);

        const data = {
            cars,
            timetable
        }
        writeLog('FETCH', 'Client requested images and timetable data');
        res.end(JSON.stringify(data));
    });
});

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/cars')));
app.use('/logo', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public/client')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    writeLog('SERVER', 'Server is running on port 3000');
});

// DEACTIVATE THE INTERVAL, WE JUST UPDATE WHEN WE RESTART THE RASPI
// setInterval(async () => {
// 	try {
// 		await recursiveFileSearch(DROPBOX_PATH);	
// 	} catch (error) {
// 		writeLog("SERVER", "ERROR while retrieving the files from dropbox");
// 	}
// }, FETCH_DROPBOX_FILES_TIMER);

