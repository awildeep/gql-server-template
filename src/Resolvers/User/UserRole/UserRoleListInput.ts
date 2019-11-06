import { Field, InputType} from "type-graphql";

@InputType()
export class UserRoleListInput {
    @Field()
    userId: number;
}