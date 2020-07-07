import { graphql, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';
import { Schema } from '../Schema';

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    contextValue?: any;
}

let schema: GraphQLSchema;

export const GraphqlCall = async ({ source, variableValues, contextValue }: Options): Promise<any> => {
    if (!schema) {
        try {
            schema = await Schema();
        } catch (e) {
            console.log('exception ', e.message);
        }
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue,
    });
};
