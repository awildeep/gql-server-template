import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import EnvironmentConfig from './EnvironmentConfig';
import { buildSchema } from 'type-graphql';
import Resolvers from './Resolvers';
import CustomAuthChecker from './CustomAuthChecker';
import jsonwebtoken, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const graphqlEndpoint = '/graphql';

const main = async () => {
    const connection = await createConnection();
    const schema = await buildSchema({
        resolvers: Resolvers,
        authChecker: CustomAuthChecker,
    });

    const app = Express();

    const contextFunction = async ({ req }: any) => {
        let decoded = {};
        if (req.headers.authorization) {
            try {
                decoded = jsonwebtoken.verify(
                    req.headers.authorization.replace('Bearer ', ''),
                    EnvironmentConfig.JWT_SECRET,
                    { algorithms: ['RS256'] },
                );
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    throw new Error(`jwt is expired, try to refresh your token via 'mutation RefreshToken'`);
                } else if (err instanceof JsonWebTokenError) {
                    throw new Error(`jwt must be provided via the 'authorization' header`);
                } else {
                    console.log(err);
                    throw new Error(`JWT error, is your JWT correctly formed?`);
                }
            }
        }

        return {
            req,
            user: decoded,
            connection,
        };
    };

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
