import {createConnection} from "typeorm";

export const TestConn = (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "gsm",
        password: "",
        database: "typegraphql-testing",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname+ "/../Entity/*.*"]
    })
};
