import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import {Schema} from "../Schema";
import {MyContextType} from "../Types/MyContextType";
import {User} from "../Entity/User";
import {Request} from "express";
import {Connection} from "typeorm";

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    user? : User,
    connection? : Connection
}

let schema: GraphQLSchema;

export const GraphqlCall = async ({ source, variableValues, user, connection }: Options) => {
    if (!schema) {
        try {
            schema = await Schema();
        } catch (e) {
            console.log('exception ', e.message);
        }
    }

    const contextValue: MyContextType = {
        req: {} as Request,
        user,
        connection
    };
    return graphql({
        schema,
        source,
        variableValues,
        contextValue
    });
};