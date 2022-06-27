import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'G5-8nVUN7_Y*+R+Ooj94'
    },
    tls: {
        ca: fs.readFileSync(__dirname + '/http_ca.crt'),
        rejectUnauthorized: false
    }
})

export { client };