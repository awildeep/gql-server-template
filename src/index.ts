import "reflect-metadata";
import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import cors from "cors";
import EnvironmentConfig from "./EnvironmentConfig";
import resolvers from "./Resolvers";
import jwt from "express-jwt";
import CustomAuthChecker from "./CustomAuthChecker";

const path = '/graphql';

const main = async () => {
    const connection = await createConnection();

    const schema = await buildSchema({
        resolvers,
        authChecker: CustomAuthChecker
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req}: any ) => {
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
        console.log(`🚀 Server ready at http://localhost:${EnvironmentConfig.PORT}${apolloServer.graphqlPath}`);
    })
};


main();