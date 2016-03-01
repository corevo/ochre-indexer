import fs from 'fs';
import path from 'path';

export default function getFileStats(filePath, cb) {
    let filenameBegining = filePath.lastIndexOf(path.sep) + 1;
    let statsPath = `${filePath.substr(0, filenameBegining)}.${filePath.substr(filenameBegining)}.json`;
    let stats = {};
    try {
        stats = require(statsPath);
    } catch(err) {
        console.log(`${filePath} doesn't have tags`);
    }
    return stats;
}
