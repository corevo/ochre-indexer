import elastic from 'elasticsearch';

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200',
    sniffOnStart: true
});
