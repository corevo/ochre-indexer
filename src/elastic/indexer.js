import fs from 'fs';
import md5 from 'md5';
import info from 'info.js';
import Directory from '../utils/directory';
import getStats from '../utils/file';

export default class Indexer {
    constructor (elasticClient, cb) {
        this.client = elasticClient;
        this.index = this.index.bind(this);
        this.cb = cb;
    }
    set amount (val) {
        this._amount = val;
        if (val === 0)
            this.cb(this.directory.directories);
    }
    get amount () {
        return this._amount;
    }
    index (path) {
        this.directory = new Directory(path);
        this.amount = this.directory.files.length;

        this.directory.files.forEach(file => {
            fs.readFile(file.path, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    let document = {
                        index: 'files',
                        type: 'document',
                        id: md5(data),
                        body: {
                            path: file.path,
                            name: file.name,
                            date: file.stats.ctime
                        }
                    };
                    info(file.path, (err, contents) => {
                        if (err) {
                            console.error(err);
                        } else {
                            document.body.contents = contents;
                        }
                        let stats = getStats(file.path);
                        if (stats)
                            document = Object.assign(document, stats);
                        this.client.index(document, () => {
                            this.amount--;
                        });
                    });
                }
            })
        });
    }
}
