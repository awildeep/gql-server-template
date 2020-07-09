import { Field, InputType } from 'type-graphql';

@InputType()
export class UserListInput {
    @Field({ nullable: true })
    userId?: number;
    @Field({ nullable: true })
    firstName?: string;
    @Field({ nullable: true })
    lastName?: string;
    @Field({ nullable: true })
    isActive?: boolean;
    @Field({ nullable: true })
    confirmed?: string;
    @Field()
    organizationId: number;

    @Field({ nullable: true })
    limit?: number = 10;
    @Field({ nullable: true })
    offset?: number = 0;
    // @Field()
    // sorting?: SortingInput;
}
