import {ObjectType, Field} from "type-graphql";
import {User} from "./User";

@ObjectType()
export class Token {
    @Field(()=> User)
    user: User;

    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}