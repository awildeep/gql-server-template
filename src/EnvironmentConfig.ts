import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
config({ path: resolve(__dirname, '../.env') });

// interface EnvironmentConfigInterface {
//     NODE_ENV: string;
//     PORT: string;
//     JWT_SECRET_FILE: string;
//     JWT_SECRET: string;
//     JWT_ISSUER: string;
//     GQL_AUTH_TOKEN_NAME: string;
//     CORS_DOMAIN: string;
//     SMTP_HOST: string;
//     SMTP_PORT: number;
//     SMTP_IS_SECURE: boolean;
//     SMTP_USERNAME: string;
//     SMTP_PASSWORD: string;
//     SMTP_TEST_MODE: boolean;
// }

const setup = (): { [index: string]: any } => {
    let jwtSecret = process.env.JWT_SECRET || '';
    const jwtSecretFile = process.env.JWT_SECRET_FILE || '';

    if (jwtSecretFile !== '') {
        //Attempt to read jwtSecret from file path
        if (fs.existsSync(jwtSecretFile)) {
            const jwtBuffer = fs.readFileSync(jwtSecretFile);
            jwtSecret = jwtBuffer.toString();
        } else {
            throw new Error('JWT_SECRET_FILE has an incorrect value');
        }
    }

    if (!process.env.CORS_DOMAIN || process.env.CORS_DOMAIN === '') {
        throw new Error('CORS_DOMAIN has an incorrect value');
    }

    return {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || '3000',
        JWT_SECRET: jwtSecret,
        JWT_SECRET_FILE: jwtSecretFile,
        JWT_ISSUER: process.env.JWT_ISSUER || 'typegraphql-test-app-issuer',
        GQL_AUTH_TOKEN_NAME: process.env.GQL_AUTH_TOKEN_NAME || 'authorization',
        CORS_DOMAIN: process.env.CORS_DOMAIN || 'localhost',
        SMTP_HOST: process.env.SMTP_HOST || 'smtp.ethereal.email',
        SMTP_PORT: Number(process.env.SMTP_HOST) || 587,
        SMTP_IS_SECURE: process.env.SMTP_HOST === 'true',
        SMTP_USERNAME: process.env.SMTP_USERNAME || '',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
        SMTP_TEST_MODE: process.env.SMTP_TEST_MODE === 'true',
    };
};

const EnvironmentConfig = setup();

export default EnvironmentConfig;
