import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import {Schema} from "../Schema";

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

export const GraphqlCall = async ({ source, variableValues }: Options) => {
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
        variableValues
    });
};