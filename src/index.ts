import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
// import { useSofa, OpenAPI } from 'sofa-api';
import { createConnection } from 'typeorm';
import cors from 'cors';
import EnvironmentConfig from './EnvironmentConfig';
import jwt from 'express-jwt';
import { buildSchema } from 'type-graphql';
import Resolvers from './Resolvers';
import CustomAuthChecker from './CustomAuthChecker';
import jsonwebtoken from 'jsonwebtoken';

const graphqlEndpoint = '/graphql';
// const restEndpoint = '/api';

const main = async () => {
    const connection = await createConnection();
    const schema = await buildSchema({
        resolvers: Resolvers,
        authChecker: CustomAuthChecker,
    });

    const app = Express();
    app.use(
        graphqlEndpoint,
        jwt({
            secret: EnvironmentConfig.JWT_SECRET,
            credentialsRequired: false,
            algorithms: ['RS256'],
            requestProperty: 'jwtToken',
        }),
    );

    const contextFunction = async ({ req }: any) => {
        // console.log({authorization: req.headers.authorization})
        let decoded = {};
        if (req.headers.authorization) {
            decoded = jsonwebtoken.verify(
                req.headers.authorization.replace('Bearer ', ''),
                EnvironmentConfig.JWT_SECRET,
                { algorithms: ['RS256'] },
            );
        }

        return {
            req,
            user: decoded,
            connection,
        };
    };

    // app.use(restEndpoint,
    //     useSofa({
    //         schema,
    //         context: contextFunction,
    //     }));

    app.use(
        cors({
            credentials: true,
            origin: EnvironmentConfig.CORS_DOMAIN,
        }),
    );

    const apolloServer = new ApolloServer({
        schema,
        context: contextFunction,
    });

    // Apply the GraphQL server middleware
    apolloServer.applyMiddleware({ app, path: graphqlEndpoint });

    app.listen(EnvironmentConfig.PORT, () => {
        const envKeys = Object.keys(EnvironmentConfig);

        envKeys.forEach((envKey) => {
            if (!['JWT_SECRET', 'SERVICE_PASSWORD', 'SMTP_PASSWORD'].includes(envKey)) {
                if (envKey in EnvironmentConfig) {
                    console.log(`⚙️  ${envKey} set to '${EnvironmentConfig[envKey]}'`);
                }
            }
        });

        console.log(
            `🚀 Server ready at ${EnvironmentConfig.CORS_DOMAIN}:${EnvironmentConfig.PORT}${apolloServer.graphqlPath}`,
        );
        // or ${EnvironmentConfig.CORS_DOMAIN}:${EnvironmentConfig.PORT}${restEndpoint}`);
    });
};

main();
