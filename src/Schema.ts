import {buildSchema} from "type-graphql";
import CustomAuthChecker from "./CustomAuthChecker";
import Resolvers from "./Resolvers";

export const Schema = async () => {
    return await buildSchema({
        resolvers: Resolvers,
        authChecker: CustomAuthChecker
    })
};
