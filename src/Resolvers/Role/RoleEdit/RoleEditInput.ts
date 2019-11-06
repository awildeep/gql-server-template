import { MinLength} from "class-validator";
import { Field, InputType} from "type-graphql";
import {isRoleUsed} from "./isRoleUsed";

@InputType()
export class RoleEditInput {
    @Field()
    roleId: number;

    @Field()
    @MinLength(3)
    @isRoleUsed({message: "Role already in use"})
    name: string;
}