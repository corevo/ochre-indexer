import elastic from 'elasticsearch';
import Indexer from './elastic/indexer';

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200',
    sniffOnStart: true
});
let indexer = new Indexer(client);

export default function indexDirectory(path) {
    indexer.index(path);
}
