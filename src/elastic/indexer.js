import fs from 'fs';
import md5 from 'md5';
import info from 'info.js';
import Directory from '../utils/directory';

export default class Indexer {
    constructor (elasticClient) {
        this.client = elasticClient;
        this.index = this.index.bind(this);
    }
    index (path) {
        let directory = new Directory(path);

        directory.files.forEach(file => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    let document = {
                        index: 'files',
                        type: 'document',
                        id: md5(data)
                    };
                    info(file.path, (err, contents) => {
                        if (err) {
                            console.error(err);
                        } else {
                            document.body = contents;
                            document.body.path = file.path;
                            document.body.date = file.ctime;
                            this.client.index(document);
                        }
                    });
                }
            })
        });
    }
}
