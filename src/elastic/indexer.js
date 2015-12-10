import info from 'info.js';
import Directory from '../utils/directory';

export default class Indexer {
    constructor (elasticClient) {
        this.client = elasticClient;
        this.index = this.index.bind(this);
    }
    index (path) {
        let directory = new Directory(path);
    }
}
