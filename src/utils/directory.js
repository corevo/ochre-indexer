import fs from 'fs';
import path from 'path';

export default class Directory {
    constructor (dirPath) {
        this.directories = [];
        this.files = [];
        this.path = dirPath;
        let items = fs.readdirSync(this.path);
        items.forEach(item => {
            // not hidden
            if (! /^\..*/.test(item)) {
                let itemPath = path.join(this.path, item);
                let fileStats = fs.statSync(itemPath);
                if (fileStats.isDirectory()) {
                    this.directories.push(itemPath);
                } else if (fileStats.isFile()) {
                    this.files.push(itemPath);
                }
            }
        });
    }
}
