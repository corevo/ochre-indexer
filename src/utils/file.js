import fs from 'fs';
import path from 'path';

export default function getFileStats(filePath, cb) {
    let filenameBegining = filePath.lastIndexOf(path.sep) + 1;
    let statsPath = `${filePath.substr(0, filenameBegining)}.${filePath.substr(filenameBegining)}.json`;
    return require(statsPath);
}
