import { buildSchema } from 'type-graphql';
import CustomAuthChecker from './CustomAuthChecker';
import Resolvers from './Resolvers';
import { GraphQLSchema } from 'graphql';

export const Schema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: Resolvers,
        authChecker: CustomAuthChecker,
    });
};
