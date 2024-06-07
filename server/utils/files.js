	const fs = require('fs');
const { Dropbox } = require('dropbox');
const { appKey, appSecret, refreshToken } = require('../config');
const { findIndex } = require('lodash');
const { writeLog } = require('./logs');

const config = {
    clientId: appKey,
    clientSecret: appSecret,
    refreshToken
}

const dbx = new Dropbox(config);

CARS_PATH = 'public/cars/';
CSV_PATH = 'public/csv/agenda.csv';
DROPBOX_PATH = '';
DROPBOX_CARS_PATH = '/cars';

/**
 * Recursively searches for files in a Dropbox folder and downloads CSV and image files.
 * @returns {Promise<void>} - A promise that resolves when all files are downloaded.
 */
const recursiveFileSearch = async (filePath) => {
    try {
        const response = await dbx.filesListFolder({ path: filePath });
        const dropboxFiles = response.result.entries;

        dropboxFiles.forEach(file => {
            if (file['.tag'] === 'file') {
                const fileType = file.name.split('.').pop();
                if (fileType === 'csv') {
                    downloadNow(CSV_PATH, file.path_lower)
                } else if (fileType === 'jpg' || fileType === 'png') {
                    const filePath = CARS_PATH + file.name;
                    if (fs.existsSync(filePath)) {
                        console.log('[SKIP]'.yellow, `${file.name.bold} already exists in ${CARS_PATH.italic}`);
                        writeLog('SKIP', `${file.name} already exists in ${CARS_PATH}`);
                    } else {
                        downloadNow(filePath, file.path_lower);
                    }
                }   
            } else if (file['.tag'] === 'folder') {
                console.log('[SEARCH]'.cyan, `Check if there is more files in folder ${file.path_display.italic}/`);
                writeLog('SEARCH', `Check if there is more files in folder ${file.path_display}/`);
                recursiveFileSearch(file.path_display);
            }
        });
        if (filePath === DROPBOX_CARS_PATH) deleteSoldCars(dropboxFiles)
    } catch (error) {
	console.log("Error in recursive file search");
        console.error(error);
    }
}

/**
 * Downloads a file from Dropbox and saves it to the specified destination path.
 * @param {string} destinationPath - The path where the file should be saved.
 * @param {string} filePath - The path of the file in Dropbox.
 * @returns {Promise<void>} - A promise that resolves when the file is downloaded and saved successfully.
 */
const downloadNow = async (destinationPath, filePath) => {
    try {
        const response = await dbx.filesDownload({ path: filePath });
        fs.writeFileSync(destinationPath, response.result.fileBinary);
        console.log('[DOWNLOAD]'.green, `${filePath.bold} to ${destinationPath.italic}`);
        writeLog('DOWNLOAD', `${filePath} to ${destinationPath}`);
    } catch (error) {
        console.error('ERROR'.red, `Failed to download ${filePath}:`, error);
        writeLog('ERROR', `Failed to download ${filePath}: ${error}`);
    }
}

/**
 * Deletes local car files that are no longer listed in the cloud.
 * @param {Array} cloudCarList - The list of car files in the cloud.
 * @returns {Promise<void>} - A promise that resolves when the local files are deleted.
 */
const deleteSoldCars = async (cloudCarList) => {
    let localFiles = await readLocalFiles();
    const sellingCarList = cloudCarList.map(fileObject => fileObject.name);

    localFiles.forEach(localFile => {
        const indexToDelete = findIndex(sellingCarList, cloudFileName => cloudFileName === localFile);
        if (indexToDelete === -1) {
            const filePath = `${CARS_PATH}${localFile}`;
            fs.unlinkSync(filePath);
            console.log('[DELETE]'.red, `${filePath.bold} car is no longer for sale`);
            writeLog('DELETE', `${filePath} car is no longer for sale`);
        }
    });
}

/**
 * Reads the local files from the specified directory.
 * @returns {Promise<string[]>} A promise that resolves with an array of file names.
 */
const readLocalFiles = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(CARS_PATH, (err, files) => {
            if (err) {
		console.log(error);
		writeLog("SERVER", "ERROR we could not read local files, files.js");
                reject([]);
            } else {
                resolve(files);
            }
        });
    });
}

module.exports = { recursiveFileSearch, DROPBOX_PATH };
