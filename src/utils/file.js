import fs from 'fs';
import path from 'path';

const METADATA_PATH = process.env.METADATA_PATH || '/data/.metadata';

export default function getFileStats(fileHash) {
    let stats = {};
    try {
        stats = require(path.join(METADATA_PATH, `.${fileHash}.json`));
    } catch(err) {
        console.log(`${fileHash} doesn't have tags`);
    }
    return stats;
}
