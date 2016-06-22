import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import info from 'info.js';
import getStats from '../utils/file';
import createPreview from '../utils/preview';

const FILES_PATH = process.env.FILES_PATH || '/data';
const PREVIEW_PATH = process.env.PREVIEW_PATH || '/data/.previews';

export default class Indexer {
    constructor (elasticClient) {
        this.client = elasticClient;
        this.index = this.index.bind(this);
        this.deleteIndex = this.deleteIndex.bind(this);
    }
    deleteIndex (file, cb) {
        this.client.deleteByQuery({
            index: 'files',
            body: {
                query: {
                    term: {
                        path: file
                    }
                }
            }
        }, cb);
    }
    index (file, cb) {
        let stats = fs.statSync(file);
        fs.readFile(file, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const fileHash = md5(data);
                let document = {
                    index: 'files',
                    type: 'document',
                    id: fileHash,
                    body: {
                        path: file,
                        name: path.basename(file, path.extname(file)),
                        date: stats.ctime
                    }
                };
                info(file, (err, contents) => {
                    if (err) {
                        console.error(err);
                    } else {
                        document.body.contents = contents;
                    }
                    let stats = getStats(fileHash);
                    if (stats) {
                        document.body = Object.assign(document.body, stats);
                    }
                    this.client.index(document, cb);
                    createPreview(file, FILES_PATH, PREVIEW_PATH, (err, out) => {
                        if(err) {
                            console.error(err);
                        } else {
                            console.log(out);
                        }
                    });
                });
            }
        })
    }
}
