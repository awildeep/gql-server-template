import "reflect-metadata";
import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import {createConnection} from "typeorm";
import cors from "cors";
import EnvironmentConfig from "./EnvironmentConfig";
import jwt from "express-jwt";
import {Schema} from "./Schema";

const path = '/graphql';

const main = async () => {
    const connection = await createConnection();

    const apolloServer = new ApolloServer({
        schema: await Schema(),
        context: ({req}: any ) => {
            console.log(req.user);
            return {
                req,
                user: req.user,
                connection

            }
        }
    });

    const app = Express();

    app.use(
        path,
        jwt({
            secret: EnvironmentConfig.JWT_SECRET,
            credentialsRequired: false,
            algorithms: ['RS256'],
        }),
    );

    app.use(
        cors({
            credentials: true,
            origin: EnvironmentConfig.CORS_DOMAIN,
        })
    );

    // Apply the GraphQL server middleware
    apolloServer.applyMiddleware({ app, path });

    app.listen(EnvironmentConfig.PORT, () => {
        console.log(`🚀 Server ready at ${EnvironmentConfig.CORS_DOMAIN}${apolloServer.graphqlPath}`);
    })
};


main();