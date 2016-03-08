import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import info from 'info.js';

export default class Indexer {
    constructor (elasticClient) {
        this.client = elasticClient;
        this.index = this.index.bind(this);
    }
    index (file, cb) {
        let stats = fs.statSync(file);
        fs.readFile(file, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let document = {
                    index: 'files',
                    type: 'document',
                    id: md5(data),
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
                    this.client.index(document, cb);
                });
            }
        })
    }
}
