import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Status {
    @Field()
    up: boolean;
}
