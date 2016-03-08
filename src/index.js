import elastic from 'elasticsearch';
import Indexer from './elastic/indexer';

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200'
});

export default function indexDirectory(path, cb) {
    let indexer = new Indexer(client, cb);
    indexer.index(path);
}
