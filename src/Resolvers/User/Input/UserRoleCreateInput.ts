import { Field, InputType } from 'type-graphql';

@InputType()
export class UserRoleCreateInput {
    @Field()
    userId: number;

    @Field()
    roleId: number;
}
