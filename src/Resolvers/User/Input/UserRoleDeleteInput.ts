import { Field, InputType } from 'type-graphql';

@InputType()
export class UserRoleDeleteInput {
    @Field()
    userRoleId: number;
}
