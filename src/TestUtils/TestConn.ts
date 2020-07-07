import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';

export const TestConn = (drop = false): Promise<Connection> => {
    return createConnection({
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'gsm',
        password: '',
        database: 'typegraphql-testing',
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + '/../Entity/*.*'],
    });
};
