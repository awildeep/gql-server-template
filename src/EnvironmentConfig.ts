import {config} from "dotenv";
import {resolve} from "path";
import fs from "fs";
config({ path: resolve(__dirname, "../.env") });

interface EnvironmentConfigInterface {
    NODE_ENV                         : string,
    PORT                             : string,
    JWT_SECRET_FILE                  : string,
    JWT_SECRET                       : string,
    GQL_AUTH_TOKEN_NAME              : string,
    CORS_DOMAIN                      : string,
}

const setup = (): EnvironmentConfigInterface => {
    let jwtSecret = process.env.JWT_SECRET || "";
    let jwtSecretFile = process.env.JWT_SECRET_FILE || "";

    if (jwtSecretFile !== "") {
        //Attempt to read jwtSecret from file path
        if(fs.existsSync(jwtSecretFile)) {
            const jwtBuffer = fs.readFileSync(jwtSecretFile);
            jwtSecret = jwtBuffer.toString();
        } else {
            throw(new Error('JWT_SECRET_FILE has an incorrect value'))
        }
    }

    if (!process.env.CORS_DOMAIN || process.env.CORS_DOMAIN === '') {
        throw(new Error('CORS_DOMAIN has an incorrect value'))
    }


    return ({
        NODE_ENV                         : process.env.NODE_ENV || 'development',
        PORT                             : process.env.PORT || '3000',
        JWT_SECRET                       : jwtSecret,
        JWT_SECRET_FILE                  : jwtSecretFile,
        GQL_AUTH_TOKEN_NAME              : process.env.GQL_AUTH_TOKEN_NAME || 'authorization',
        CORS_DOMAIN                      : process.env.CORS_DOMAIN!
    })
};

const EnvironmentConfig = setup();

export default EnvironmentConfig;