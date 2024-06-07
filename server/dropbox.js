const { recursiveFileSearch, DROPBOX_PATH } = require('./utils/files');
const colors = require('colors');

recursiveFileSearch(DROPBOX_PATH);