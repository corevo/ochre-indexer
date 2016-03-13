import elastic from 'elasticsearch';
import Indexer from './elastic/indexer';

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200'
});

let indexer = new Indexer(client);

export default indexer.index;
