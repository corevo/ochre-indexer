import elastic from 'elasticsearch';
import Indexer from './elastic/indexer';
import deleteByQuery from 'elasticsearch-deletebyquery';
let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200',
    plugins: [ deleteByQuery ]
});

let indexer = new Indexer(client);

export default indexer.index;
