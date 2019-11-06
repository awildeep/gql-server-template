import {Field, InputType} from "type-graphql";

@InputType()
export class RoleDeleteInput {
    @Field()
    roleId: number;
}